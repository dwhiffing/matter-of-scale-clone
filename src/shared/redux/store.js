import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import _ from 'lodash'

// combine all reducers into a single object
import * as ProfileReducers from 'profiles/reducers'
import * as SharedReducers from 'shared/reducers'
import * as PackageReducers from 'packages/reducers'
export const combinedReducers = combineReducers(_.merge({},
  ProfileReducers,
  SharedReducers,
  InboxReducers,
  PackageReducers,
  SearchReducers
))

// generic dispatch function (not hooked up to the store)
/* istanbul ignore next: used for testing or other one off state mutations */
export const dispatch = (state, action, key) => {
  return combinedReducers({[key]: state}, action)[key]
}

// guide to redux middleware: http://gaearon.github.io/redux/docs/advanced/Middleware.html
let finalCreateStore = compose(
  applyMiddleware(promise, logger)
)(createStore)

// TODO: could wrap this in a method for initial state for test cases
const initialState = {}

export default finalCreateStore(combinedReducers, initialState)
