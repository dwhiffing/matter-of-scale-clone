import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import u from 'updeep'
import { reducerCreator } from 'utils/reduxHelpers'

const initialState = {}

const buildingReducers = {

  createInstance(state, action) {
    let type = action.payload
    let id = Object.keys(state).length
    let property = () => store.getState().properties[type]
    let newThing = Constants.building[type].map((building, index) => {
      return {
        id: id + index,
        name: building,
        baseCost: Constants.baseCost[index],
        baseIncome: Constants.baseIncome[index],
        index: index,
        count: index === 0 ? 1 : 0,
        autoBuyAmount: 0,
        research: (key) => property().researchTypes[key].current,
        unlocked: () => property().unlockedBuildings.indexOf(index) > -1,
        costMultiplier: () => property().autoBuyCostMultiplier,
        upgrades() {
          return property().upgradedBuildings[index]
        },
        cost() {
          let pow = 1.1 - 0.008 * index
          let ignore = this.research('ignoreCost')
          let discount = this.research('discount')
          let count_eff = Math.max(this.count - ignore, 0)
          return Math.floor(this.baseCost * Math.pow(pow, count_eff) * (1 - discount))
        },
        income() {
          return this.baseIncome * this.count * this.upgrades()
        }
      }
    }).reduce((o, v, i) => {o[i+id] = v; return o}, {})
    return Object.assign({}, state, newThing)
  },

  updateBuilding(state, action) {
    const {buildingKey, update} = action.payload
    return u({
      [buildingKey]: update
    }, state)
  },

  doTick(state, action) {
    return u.map(obj => {
      let autoBuyCost = obj.cost() * obj.research('autoCost')
      let amount = obj.research(`autoBuy-${obj.index}`) * autoBuyCost
      let newObj = {
        autoBuyAmount: a => a + amount
      }
      let count = 0
      let property = store.getState().properties[obj.type]
      if (obj.autoBuyAmount >= autoBuyCost) {
        console.log(autoBuyCost)
        newObj.autoBuyAmount = 0
        newObj.count = c => c + 1
      }
      return u(newObj, obj)
    }, state)
  }

}

export default reducerCreator(buildingReducers, initialState)
