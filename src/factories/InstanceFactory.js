import store from 'utils/reduxStore'
import Constants from 'utils/Constants'
import GoalFactory from 'factories/GoalFactory'
import { sampleArray, diceRoll, getRandom } from 'utils/helpers'

export default (id, property, nth) => {

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
    goal: GoalFactory(property.id, nth),

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

  goalTarget() {
    if (this.goal.type == 0) {
      return this.income()
    } else if (this.goal.type == 1) {
      return this.money
    } else if (this.goal.type == 2) {
      return this.buildings()[this.goal.building].count
    } else {
      return this.buildings()[this.goal.building].income()
    }
  },

  goalComplete() {
    return this.goalTarget() >= this.goal.amount
  },

  goalProgress() {
    return this.goalTarget() / this.goal.amount * 100
  },

  // shorthand to the property
  property() {
    return store.getState().properties[this.type]
  }
}
