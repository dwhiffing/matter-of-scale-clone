import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import { reducerCreator } from 'utils/reduxHelpers'
import u from 'updeep'

const initialState =  u.map({
  researchPoints: 0
}, Constants.properties)

const PropertyReducers = {

  addResearch(state, {payload}) {
    return state.concat([
      Object.assign({
        income: 0,
        money: 100,
        upgradePoints: 10,
        goal: 5000,
        type: payload,
      }, Constants.properties[payload])
    ])
  },

}

export default reducerCreator(PropertyReducers, initialState)
