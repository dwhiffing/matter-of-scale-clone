import store from 'utils/reduxStore'
import Constants from 'utils/Constants'
import { sampleArray, diceRoll, getRandom } from 'utils/helpers'

export default (id, property, nth) => {
  const goal = Object.assign({
    setInstance(instance) {
      this.instanceId = instance.id

      // the possible building types based on progression, varies from 0-1, to 0-9 as nth increases
      const buildingTypes = Math.min(50, Math.ceil(instance.nth))*2
      this.building = Math.min(8, Math.floor(diceRoll(0, buildingTypes) / 10) + diceRoll(0, 1))

      // the possible amounts based on progression, earlier types double in qutatity every 10 instances
      this.amount = diceRoll(this.amountScale() * 10, this.amountScale() * 20)
    },
    getBuilding() {
      return this.instance().buildings()[this.building]
    },
    instance() {
      return store.getState().instances[this.instanceId]
    },
    complete() {
      return this.target() >= this.goal()
    },
    progress() {
      return this.target() / this.goal() * 100
    }
  }, sampleArray(Object.values(Constants.goals), 1))

  return {
    id: id,

    // what level of property this instance is
    type: property.id,

    // the display name of this instance
    name: property.name,

    // the display color of this instance
    color: property.color,

    // the currency name of this instance (deer, sheep .etc)
    currencyName: property.currencyName,

    // the research name of this instance (venison, wool .etc)
    researchName: property.researchName,

    // amount accumulated toward auto completion when progress is 100
    autoComplete: 0,

    // whether this instance has completed its goal and been marked as "complete"
    complete: false,

    // the computed progress towards the current goal for display purposes
    progress: 0,

    // the goal for this instance (just income goals for now, this should have more variety)
    goal: goal,

    // the number of this instance type
    nth: nth,

    // how much money the instance has accumulated
    money: property.research("startMoney"),

    // how much autoBuy each building should accumulate next tick
    autoBuy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }
}

export const helpers = {
  // get the buildings that belong to this instance
  // TODO: this shouldn't need to be computed
  buildings() {
    const start = this.id*10
    return Object.values(store.getState().buildings).slice(start, start + 10)
  },

  // compute income from all buildings as well as passive income from research
  income() {
    const buildingIncome = this.buildings().reduce((a, b) => a + b.income(), 0)
    const passiveIncome = this.property().research("passiveIncome")
    return buildingIncome + passiveIncome
  },

  // how many seconds it takes to auto complete this instance
  autoCompleteDuration() {
    return this.property().research("autoComplete")
  },

  // shorthand to the property
  property() {
    return store.getState().properties[this.type]
  }
}
