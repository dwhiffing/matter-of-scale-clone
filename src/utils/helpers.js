import { createAction, handleActions } from 'redux-actions'
import store from 'utils/reduxStore'
import React from 'react'
import _ from 'lodash'
import numeral from 'numeral'
import updeep from 'updeep'

// incrementers for use with updeep
export const add = (i=1) => n => n + i
export const sub = (i=1) => n => n - i

// convert an array to an object with numeric keys
export const toObj = (object, value, i) => {
  object[i] = value
  return object
}

export const pushToObj = (obj, arr) => {
  // convert obj to an array and push arr
  const objArr = Object.values(obj)

  // flatten and convert back to object
  return [objArr, arr].reduce((a, b) => a.concat(b)).reduce(toObj, {})
}

// short hand for state update on dynamic key
export const shallowUpdate = (key, update, state) => {
  return updeep({
    [key]: update
  }, state)
}

// turn string to CONSTANT_CASE
export const constantize = (string) => {
  return string
          .replace(/\W+/g, '_')
          .replace(/([a-z\d])([A-Z])/g, '$1_$2')
          .toUpperCase()
}

// shorthand to numeral's format
export const format = (string, format) => {
  return numeral(string).format(format)
}

export const clamp = (max, value) => {
  let difference = value - max
  if (difference < 0) {
    difference = value
  }
  return Math.min(max, difference)
}

export const titleify = (str) => {
  if (!str) return
  return str.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase())
}

export const getRandom = (min, max) => {
  return Math.random() * (max - min) + min
}

export const diceRoll = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const sampleArray = (arr, num) => {
  return arr[diceRoll(0, arr.length-1)]
}

export const replaceString = (obj, string) => {
  Object.keys(obj).forEach(name => {
    string = string.replace(`{${name}}`, obj[name])
  })
  return string
}

export const Color = (props) => {
  return (
    <span className="property-color">
      {props.children}
    </span>
  )
}

export const colorStyle = (color) => ({
  fontWeight: 900,
  fontSize: '1.2em',
  color: color,
})

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
