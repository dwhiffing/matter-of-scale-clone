import { sampleArray, diceRoll, getRandom } from 'utils/helpers'
import { baseIncome, buildingNames} from 'factories/BuildingFactory'

const goals = [
  {
    type: 0,
    amountScale(nth) {
      return Math.min(20, Math.ceil(nth / 10))
    },
    getDescription(amount, building) {
      return `get ${amount} income`
    }
  }, {
    type: 1,
    amountScale(nth) {
      return Math.min(100, Math.ceil(nth / 5)) * 10
    },
    getDescription(amount, building) {
      return `get ${amount} money`
    }
  }, {
    type: 2,
    amountScale(nth, building) {
      const amountClamp = (5 - Math.min(5, Math.ceil(nth / 10)))
      return Math.max(5, (5 - Math.floor(building / 2)) - amountClamp)
    },
    getDescription(amount, building) {
      return `get ${amount} ${building}`
    }
  }, {
    type: 3,
    amountScale(nth, building) {
      const amountClamp = Math.min(1, Math.ceil(nth / 20))
      return (5 - Math.floor(building / 2)) * amountClamp * baseIncome[building]
    },
    getDescription(amount, building) {
      return `get ${amount} income with ${building}`
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

  return {
    type: goal.type,
    building: building,
    amount: amount,
    description: goal.getDescription(amount, name)
  }
}
