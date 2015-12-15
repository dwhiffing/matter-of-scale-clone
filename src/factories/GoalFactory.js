import { sampleArray, diceRoll, getRandom, titleify } from 'utils/helpers'
import { baseIncome, baseCost, buildingNames } from 'factories/BuildingFactory'
import { currencyNames } from 'factories/PropertyFactory'

const goals = [
  {
    type: 0,
    amountScale(nth) {
      return Math.min(10, Math.ceil(nth / 10)) * Math.min(10, Math.ceil(nth / 5))
    },
    getDescription(amount, building, currency) {
      return `get ${amount} ${currency}/sec`
    }
  }, {
    type: 1,
    amountScale(nth) {
      return Math.min(10, Math.ceil(nth / 10)) * Math.min(100, Math.ceil(nth / 2)) * 10
    },
    getDescription(amount, building, currency) {
      return `get ${amount} ${currency}`
    }
  }, {
    type: 2,
    amountScale(nth, building) {
      return Math.ceil((building+1) / 2) * Math.min(5, Math.ceil(nth / 10))
    },
    getDescription(amount, building) {
      return `get ${amount} ${building}`
    }
  }, {
    type: 3,
    amountScale(nth, building) {
      return (Math.ceil((building+1) / 2)) * baseIncome[building]
    },
    getDescription(amount, building, currency) {
      return `get ${amount} ${currency}/sec with ${building}`
    }
  }
]

export default (type, nth) => {
  let goal = sampleArray(goals, 1)

  // how far have we progressed into the building levels?
  const buildingTypes = Math.min(50, Math.ceil(nth))*2

  // grab a random one of the available buildings
  const building = Math.min(8, Math.floor(diceRoll(0, buildingTypes) / 10) + diceRoll(0, 1))

  // the possible amounts based on progression, earlier types double in qutatity every 10 instances
  const name = buildingNames[type][building]
  const scale = goal.amountScale(nth, building)
  const amount = diceRoll(scale * 10, scale * 20)
  const currency = titleify(currencyNames[type])

  return {
    type: goal.type,
    building: building,
    amount: amount,
    description: goal.getDescription(amount, name, currency)
  }
}
