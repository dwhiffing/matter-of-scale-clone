import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import { reducerCreator } from 'utils/reduxHelpers'
import u from 'updeep'

const initialState = []

const InstanceReducers = {

  createInstance(state, {payload}) {
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

  deductCurrency(state, action) {
    let {instanceKey, cost} = action.payload
    return u({
      [instanceKey]: {
        money: money => money - cost
      }
    }, state)
  },

  deductUpgradeCurrency(state, action) {
    let {instanceKey, cost} = action.payload
    return u({
      [instanceKey]: {
        upgradePoints: upgradePoints => upgradePoints - cost
      }
    }, state)
  },

  doTick(state, action) {
    return u.map((obj, i) => {
      let buildings = store.getState().buildings[i]
      let incomeFromAllBuildings = 0
      buildings.forEach((b) => {
        incomeFromAllBuildings += b.income * b.count * b.upgrades
      })
      return u({
        money: obj.money + incomeFromAllBuildings,
        upgradePoints: obj.upgradePoints + 0.05,
        progress: obj.income/obj.goal*100
      }, obj)
    }, state)
  }

}

export default reducerCreator(InstanceReducers, initialState)
