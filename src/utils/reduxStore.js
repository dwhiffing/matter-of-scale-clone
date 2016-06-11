import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate, createTransform } from 'redux-persist'
import { startTicking } from 'actions/InterfaceActions'
import logger from 'utils/loggerMiddleware'
import { toObj } from 'utils/helpers'
import _ from 'lodash'

const thunk = function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
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

const propertyTransform = createTransform(
  (inState) => omitNested(inState, ['name','color','currencyName','researchName','buildingNames']),
  outState => outState,
  { whitelist: ['properties'] }
)

const instanceTransform = createTransform(
  (inState) => omitNested(inState, ['name','color','currencyName','researchName']),
  outState => outState,
  { whitelist: ['instances'] }
)

const buildingTransform = createTransform(
  (inState) => omitNested(inState, ['name','baseCost','baseIncome']),
  outState => outState,
  { whitelist: ['buildings'] }
)

const uiTransform = createTransform(
  (inState) => _.omit(inState, ['doTickTimeout', 'preTickTimeout']),
  outState => outState,
  { whitelist: ['ui'] }
)

// TODO: For some reason, debounces longer than this fail
persistStore(PersistedStore, {
  debounce: 90,
  transforms: [
    propertyTransform,
    instanceTransform,
    buildingTransform,
    uiTransform,
  ],
}, () => {
  // start the game once data has loaded
  PersistedStore.dispatch(startTicking())
})

export default PersistedStore
