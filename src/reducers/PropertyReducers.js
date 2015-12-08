import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import { reducerCreator } from 'utils/reduxHelpers'

const initialState = Constants.name.map((name, index) => {
  return {
    id: index,
    name: name,
    color: Constants.color[index],
    currencyName: Constants.currency[index],
    researchName: Constants.researchNames[index],
    researchTypes: Constants.research[index],
    research: 0,
    instances: []
  }
}).reduce((o, v, i) => {o[i] = v; return o}, {})

const PropertyReducers = {
  createInstance(state, action) {
    const id = action.payload
    const instanceId = Object.keys(store.getState().instances).length
    const updatedProperty = Object.assign({}, state[id], {
      instances: state[id].instances.concat([instanceId])
    })
    return Object.assign({}, state, {[id]: updatedProperty})
  }
}

export default reducerCreator(PropertyReducers, initialState)
