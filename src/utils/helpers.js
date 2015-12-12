import { createAction, handleActions } from 'redux-actions'
import store from 'utils/reduxStore'
import _ from 'lodash'
import numeral from 'numeral'
import updeep from 'updeep'

export const add = (i=1) => n => n + i
export const sub = (i=1) => n => n - i

// used by reduce to convert an array to an object with numeric keys
export const toObj = (object, value, i) => {
  object[i] = value
  return object
}

export const shallowUpdate = (key, update, state) => {
  return updeep({
    [key]: update
  }, state)
}

export const constantize = (string) => {
  return string
          .replace(/\W+/g, '_')
          .replace(/([a-z\d])([A-Z])/g, '$1_$2')
          .toUpperCase()
}

export const format = (string, format) => {
  return numeral(string).format(format)
}

export const percentify = (n) => {
  if (n % 1 === 0) return n
  return numeral(n*100).format('0') + '%'
}

/**
*
* This allows for extra default transforms on all reducers
* currently, it just transforms the action key to be CONSTANT_CASE
* and passes it to handleActions, which will return a single reducer from the reducer collection
*
* you can specify a single reducer for non-async actions:
* argument: {fooReducer: () => {...}, barReducer: () => {...}}
* becomes: {FOO_REDUCER: () => {...}, BAR_REDUCER: () => {...}}
*
* or next/throw for async actions
* argument: {fetchFoo: {next: () => {...sauccess}, throw: () => {...error}}}
* becomes: {FETCH_FOO: {next: () => {...success}, throw: () => {...error}}}
*
*/
export const reducerCreator = (actions, initialState) => {
  actions = _.reduce(actions, function(result, value, key) {
    result[constantize(key)] = value
    return result
  }, {})

  return handleActions(actions, initialState)
}

/**
* takes an array of keys of desired state to inject
* returns an object where each key has its associated reduxStore value mapped to it
* ex:
*     // foo, bar being properties on the reduxStore
*     const stateToConnect = mapStateKeysToProps(['foo', 'bar'])
*/
export const mapStateKeysToProps = (stateNames) => {
  return (state) => {
    // fetch values from state
    const values = stateNames.map(key => state[key])
    return _.zipObject(stateNames, values)
  }
}
