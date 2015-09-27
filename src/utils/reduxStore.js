import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import logger from 'utils/loggerMiddleware'
import thunk from 'utils/thunkMiddleware'

// combine all reducers into a single object
import * as reducers from '../reducers'
export const combinedReducers = combineReducers(reducers)

// guide to redux middleware: http://gaearon.github.io/redux/docs/advanced/Middleware.html
let finalCreateStore = compose(applyMiddleware(logger, thunk)(createStore))

const initialState = {}

export default finalCreateStore(combinedReducers, initialState)
