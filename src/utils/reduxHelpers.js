import { createAction, handleActions } from 'redux-actions'
import store from 'utils/reduxStore'
import _ from 'lodash'

let constantize = (string) => {
  return string
          .replace(/\W+/g, '_')
          .replace(/([a-z\d])([A-Z])/g, '$1_$2')
          .toUpperCase()
}

/** 
* These helpers exist to reduce boiler plate and enforce some standards on the app data
* if you define actions or reducers that break the convention, things will not behave as expected
*
* actions should look something like this: 
*  {
*    type: 'ACTION_NAME',
*    payload: {...someData},
*  }
*/

/** 
* pass in an object like so: {actionName: actionPayloadFunction}
* (actionPayloadFunction should return the intended payload of the action)
*
* will return a new object where the actions are mapped like so:
*
*  {
*    type: 'ACTION_NAME',
*    payload: (return of actionPayloadFunction)
*  }
* 
*/
export const actionCreatorFactory = (actionDefinitions) => {
  return _.mapValues(actionDefinitions, (value, key) => {
    let type = constantize(key)
    return createAction(type, value, (...meta) => meta)
  })
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
* argument: {fetchFoo: {next: () => {...success}, throw: () => {...error}}}
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
* These are helpers for doing typical redux connection for components
* 
* ex:
*     // wrap the component in redux-react 'connect' (takes a 1-2 functions and passes the instances state and dispatch to them)
*     export default connect(stateToConnect, actionsToConnect)(Component)
*/

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

/**
* takes an array of objects where the action type is mapped to its creator
* returns a function which dispatches that action
* ex:
*     // FooActions, BarActions being an object containing a domain of actions
*     const actionsToConnect = mapActionCreatorsToProps([FooActions, BarActions]) 
*/
export const mapActionCreatorsToProps = (actionCreators) => { 
  actionCreators.unshift({})
  var obj = _.merge.apply(this, actionCreators)
  return (dispatch) => {
    return _.mapValues(obj, (value) => {
      return (...args) => dispatch(value(...args))
    })
  }
}
