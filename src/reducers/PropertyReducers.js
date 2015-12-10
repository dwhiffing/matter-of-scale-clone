import Constants from 'utils/Constants'
import store from 'utils/reduxStore'
import { reducerCreator } from 'utils/reduxHelpers'
import u from 'updeep'

const initialState = Constants.name.map((name, index) => {
  let instances = function() {
    let instances = store.getState().instances
    instances = Object.keys(instances).map(i => instances[i])
    return instances.filter(i => i.type == index)
  }

  let researchTypes = {}
  if (index === 0) {
    researchTypes.extra = ({rank: 0, current: 1, increment: 1, max: 5, description: "You can have NEXT (CURRENT) NAMEs active at once"})
  }
  researchTypes = Object.assign(researchTypes, Constants.research)
  let buildingNames = Constants.building[index]
  buildingNames.forEach((b, i) => {
    researchTypes['autoBuy-'+i] = {rank: 0, current: 0, increment: 0.05, max: 0.5,description: `AutoBuy NEXT of ${b} per tick (CURRENT)`}
  })

  return {
    id: index,
    name: name,
    color: Constants.color[index],
    currencyName: Constants.currency[index],
    researchName: Constants.researchNames[index],
    buildingNames: buildingNames,
    researchTypes: researchTypes,
    unlocked: index == 0,
    upgradedBuildings: [1,1,1,1,1,1,1,1,1,1],
    unlockedBuildings: [0],
    upgradeRate: 0.005,
    research: 0,
    upgrades: 0,
    next: Math.floor(1 + index / 3),
    instances: instances,
    income() {
      return instances().filter(i => !i.complete).reduce((a, b) => a + b.income(), 0)
    },
    money() {
      return instances().filter(i => !i.complete).reduce((a, b) => a + b.money, 0)
    }
  }
}).reduce((o, v, i) => {o[i] = v; return o}, {})

const PropertyReducers = {

  updateProperty(state, action) {
    const {propertyKey, update} = action.payload
    return u({
      [propertyKey]: update
    }, state)
  },

  doTick(state, action) {
    return u.map((obj) => {
      return u({
        upgrades: m => m + obj.upgradeRate + (obj.upgradeRate * obj.researchTypes.upgradeRate.current)
      }, obj)
    }, state)
  }
}

export default reducerCreator(PropertyReducers, initialState)
