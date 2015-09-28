import React from 'react/addons'
import jsdom from 'jsdom'
import {combinedReducers} from 'reducers/index'

// create simulated document/window
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView
global.document = doc
global.window = win

// expose common dependencies globally to reduce boilerplate for tests
global.React = React
global.TestUtils = React.addons.TestUtils
global.combinedReducers = combinedReducers
global.dispatch = (state, action, key) => {
  return combinedReducers({[key]: state}, action)[key]
}

// mirror all window keys to global as a browser would
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})
