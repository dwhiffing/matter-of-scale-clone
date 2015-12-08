import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import u from 'updeep'
import { reducerCreator } from 'utils/reduxHelpers'

const initialState = {}

const buildingReducers = {

  createInstance(state, action) {
    let type = action.payload
    let id = Object.keys(state).length
    let newThing = Constants.building[type].map((building, index) => {
      return {
        id: id,
        name: building,
        baseCost: Constants.baseCost[index],
        baseIncome: Constants.baseIncome[index],
        unlocked: index <= 4,
        index: index,
        upgrades: 1,
        count: 0,
        cost() {
          let pow = 1.1 - 0.008 * index
          let count_eff = Math.max(this.count, 0)
          return Math.floor(this.baseCost * Math.pow(pow, count_eff))
        },
        income() {
          return this.baseIncome * this.count * this.upgrades
        }
      }
    }).reduce((o, v, i) => {o[i] = v; return o}, {})
    return Object.assign({}, state, newThing)
  },

  addBuilding(state, action) {
    const {buildingKey} = action.payload
    return u({
      [buildingKey]: {
        count: m => m + 1
      }
    }, state)
  },

  upgradeBuilding(state, action) {
    const id = action.payload
    return u({
      [buildingKey]: {
        upgrades: m => m + 1
      }
    }, state)
  },

  doTick(state, action) {
    return state
  }

}

export default reducerCreator(buildingReducers, initialState)
