import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate, createTransform } from 'redux-persist'
import { toObj } from 'utils/helpers'
import _ from 'lodash'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import * as reducers from 'reducers'
import BuildingSagas from 'sagas/BuildingSagas'
import InstanceSagas from 'sagas/InstanceSagas'
import InterfaceSagas from 'sagas/InterfaceSagas'
import PropertySagas from 'sagas/PropertySagas'

const sagaMiddleware = createSagaMiddleware()

// combine all reducers into a single object
export const combinedReducers = combineReducers(reducers)

const logger = createLogger({
  predicate: (getState, action) => action.type !== 'DO_TICK',
})

// guide to redux middleware: http://gaearon.github.io/redux/docs/advanced/Middleware.html
const composedStore = compose(
  applyMiddleware(sagaMiddleware, logger)
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
  sagaMiddleware.run(BuildingSagas)
  sagaMiddleware.run(InstanceSagas)
  sagaMiddleware.run(InterfaceSagas)
  sagaMiddleware.run(PropertySagas)
  PersistedStore.dispatch({ type: 'START_TICKING' })
})


export default PersistedStore
