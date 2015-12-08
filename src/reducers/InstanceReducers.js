import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import { reducerCreator } from 'utils/reduxHelpers'
import u from 'updeep'

const initialState = {}

const InstanceReducers = {

  createInstance(state, action) {
    const id = Object.keys(state).length
    const buildings = store.getState().buildings
    const property = store.getState().properties[action.payload]
    const buildingsArr = Object.keys(buildings).map(o => buildings[o]).slice(id, id + 10)
    return Object.assign({}, state, {[id]: {
      id: id,
      name: property.name,
      color: property.color,
      currency: property.currency,
      research: property.research,
      buildings: buildingsArr,
      income() {
        return this.buildings.reduce((o, i) => buildings[o].income() + o, 0)
      },
      upgradePoints: 10,
      goal: 5000,
      money: 100,
    }})
  },

  deductCurrency(state, action) {
    let {instanceKey, cost} = action.payload
    return u({
      [instanceKey]: {
        money: m => m - cost
      }
    }, state)
  },

  deductUpgradeCurrency(state, action) {
    let {instanceKey, cost} = action.payload
    return u({
      [instanceKey]: {
        upgradePoints: m => m - cost
      }
    }, state)
  },

  doTick(state, action) {
    let thing = u.map((obj) => {
      return u({
        money: m => m + obj.income(),
        upgradePoints: m => m + 0.05,
        progress: obj.income() / obj.goal * 100
      }, obj)
    }, state)
    return thing
  }

}

export default reducerCreator(InstanceReducers, initialState)
