import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { startTicking} from 'actions/InterfaceActions'
import logger from 'utils/loggerMiddleware'
import { toObj } from 'utils/helpers'
import _ from 'lodash'

const thunk = function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}

// combine all reducers into a single object
import * as reducers from '../reducers'
export const combinedReducers = combineReducers(reducers)

// guide to redux middleware: http://gaearon.github.io/redux/docs/advanced/Middleware.html
const composedStore = compose(
  applyMiddleware(logger, thunk)
)(createStore)

// persist to local storage with redux-persist
const PersistedStore = autoRehydrate()(composedStore)(combinedReducers)

const omitNested = (obj, omit) => {
  return Object.values(obj).map(t => _.omit(t, omit)).reduce(toObj, {})
}

// TODO: For some reason, debounces longer than this fail
persistStore(PersistedStore, {
  debounce: 90,
  transforms: [{
    in: (state) => {
      // interface omitted keys
      if (state.multi) {
        return _.omit(state, ['doTickTimeout', 'preTickTimeout'] )
      }
      // instance omitted keys
      if (state[0].autoBuy) {
        return omitNested(state, ['name','color','currencyName','researchName'])
      }
      // property omitted keys
      else if (state[0].unlockedBuildings) {
        return omitNested(state, ['name','color','currencyName','researchName','buildingNames'])
      }
      // building omitted keys
      else {
        return omitNested(state, ['name','baseCost','baseIncome'])
      }
    },
    out: (raw) => {
      return raw
    },
  }],
  rehydrateAction: (key, data) => {
    return {
      type: 'REHYDRATE',
      key: key,
      payload: data
    }
  },
}, () => {
    // start the game once data has loaded
    PersistedStore.dispatch(startTicking())
  }
)

export default PersistedStore
