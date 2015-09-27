import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import u from 'updeep'
import { reducerCreator } from 'utils/reduxHelpers'

const initialState = []

const buildingReducers = {

  createInstance(state, {payload}) {
    let instanceKey = state[payload] ? state[payload].length : 0
    return u({
      [payload]: 
      Constants.buildings[payload].map((building, index) => ({
        baseCost: Constants.baseData[index][0],
        baseIncome: Constants.baseData[index][1],
        income: Constants.baseData[index][1],
        unlocked: index <= 4,
        name: building, 
        index: index, 
        upgrades: 0,
        count: 0,
        cost: function() {
          let pow = 1.1 - 0.008 * index
          let count_eff = Math.max(this.count, 0)
          // let researchDiscount = property.researchUpgrades ? property.researchUpgrades.discount.current : 0
          // let discount = (1 - Math.min(100, researchDiscount*100) / 100)
          let discount = 1
          return Math.floor(this.baseCost * Math.pow(pow, count_eff)) * discount
        }
      }))
    }, state)
  },

  addBuilding(state, action) {
    let {instanceKey, buildingKey} = action.payload
    return u({
      [instanceKey]: {[buildingKey]: {
        count: i => i+1
      }}
    }, state)
  },

  upgradeBuilding(state, action) {
    let {propertyKey, instanceKey, buildingKey} = action.payload
    return u({
      [instanceKey]: {[buildingKey]: {
        upgrades: i => i+1
      }}
    }, state)
  },

  doTick(state, action) {
    return state
  }

}

export default reducerCreator(buildingReducers, initialState)
