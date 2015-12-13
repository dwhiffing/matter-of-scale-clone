import { sampleArray, diceRoll, getRandom } from 'utils/helpers'
import Constants from 'utils/Constants'

export default (type, nth) => {
  let newGoal = Object.assign({
    init(type, nth) {
      // the possible building types based on progression, varies from 0-1, to 0-9 as nth increases
      const buildingTypes = Math.min(50, Math.ceil(nth))*2
      this.building = Math.min(8, Math.floor(diceRoll(0, buildingTypes) / 10) + diceRoll(0, 1))
      this.buildingIncome = Constants.baseIncome[this.building]
      this.buildingName = Constants.building[type][this.building]

      // the possible amounts based on progression, earlier types double in qutatity every 10 instances
      this.amount = diceRoll(this.amountScale(nth) * 10, this.amountScale(nth) * 20)
    },
  }, sampleArray(goals, 1))

  newGoal.init(type, nth)
  return {
    type: newGoal.type,
    amount: newGoal.amount,
    building: newGoal.building,
    description: newGoal.description()
  }
}

const goals = [
  {
    type: 0,
    amountScale(nth) {
      return Math.min(20, Math.ceil(nth / 10))
    },
    description() {
      return `get ${this.amount} income`
    }
  }, {
    type: 1,
    amountScale(nth) {
      return Math.min(100, Math.ceil(nth / 5)) * 10
    },
    description() {
      return `get ${this.amount} money`
    }
  }, {
    type: 2,
    amountScale(nth) {
      const amountClamp = (5 - Math.min(5, Math.ceil(nth / 10)))
      return Math.max(5, (5 - Math.floor(this.building / 2)) - amountClamp)
    },
    description() {
      return `get ${this.amount} ${this.buildingName}`
    }
  }, {
    type: 3,
    amountScale(nth) {
      const amountClamp = Math.min(1, Math.ceil(nth / 20))
      return (5 - Math.floor(this.building / 2)) * amountClamp * this.buildingIncome
    },
    description() {
      return `get ${this.amount} income with ${this.buildingName}`
    }
  }
]
