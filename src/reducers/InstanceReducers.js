import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import { reducerCreator } from 'utils/reduxHelpers'
import u from 'updeep'

const initialState = {}

const InstanceReducers = {

  createInstance(state, action) {
    const id = Object.keys(state).length
    const property = store.getState().properties[action.payload]
    let buildings = function() {
      const id = Object.keys(state).length
      const buildings = store.getState().buildings
      return Object.keys(buildings).map(o => buildings[o]).slice(id*10, id*10 + 9)
    }
    let nth = Object.keys(state).map(i => state[i]).filter(obj => obj.type == property.id).length + 1
    return Object.assign({}, state, {[id]: {
      id: id,
      type: property.id,
      name: property.name,
      color: property.color,
      currencyName: property.currencyName,
      researchName: property.researchName,
      autoComplete: 0,
      complete: false,
      goal: 10 * nth,
      money: property.researchTypes.startMoney.current,
      buildings: buildings,
      income() {
        const property = store.getState().properties[action.payload]
        return buildings().reduce((a, b) => a + b.income(), 0) + property.researchTypes.passiveIncome.current
      },
      autoCompleteDuration() {
        const property = store.getState().properties[action.payload]
        return property.researchTypes.autoComplete.current
      },
    }})
  },

  updateInstance(state, action) {
    const {instanceKey, update} = action.payload
    return u({
      [instanceKey]: update
    }, state)
  },

  doTick(state, action) {
    // autobuy needs to subtract from income
    return u.map((obj) => {
      if (obj.complete) return obj
      const progress = obj.income() / obj.goal * 100
      let newObj = {}
      if (progress >= 100) {
        newObj = {
          autoComplete: c => c + 0.5
        }
      }
      return u(Object.assign(newObj, {
        money: m => m + obj.income(),
        progress: progress
      }), obj)
    }, state)
  }

}

export default reducerCreator(InstanceReducers, initialState)
