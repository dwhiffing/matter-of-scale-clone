import store from 'utils/reduxStore'
import Constants from 'utils/Constants'
import numeral from "numeral"
import { titleify } from 'utils/helpers'

// name: 'hamlet village town city castle kingdom empire planet galaxy universe'.split(' '),
// color: 'maroon silver red gray yellow aqua navy green purple black'.split(' '),
// currency: 'deer lamb brick iron soldier gold machine starship matter existence'.split(' '),
// researchNames: 'venison wool marble steel captain platinum circuit anti-matter AI transcendence'.split(' '),

export default () => {
  return Constants.name.map((name, id) => {

    const buildingNames = Constants.building[id]

    // TODO: This needs to be cleaned up
    let researchTypes = Constants.research
    if (id === 0) {
      researchTypes = Object.assign({
        extra: Constants.specialResearch.extraHamlets
      }, researchTypes)
    }
    buildingNames.forEach((b, i) => {
      researchTypes['autoBuy-'+i] = Constants.specialResearch.autoBuy
    })
    // end cleanup

    return {

      id: id,

      name: name,

      // display color
      color: Constants.color[id],

      // building currency display name
      currencyName: Constants.currency[id],

      // research currency display name
      researchName: Constants.researchNames[id],

      // building display names
      buildingNames: buildingNames,

      // accumulated research currency from instance completion
      researchMoney: 0,

      // current research levels and rates
      researchTypes: researchTypes,

      // buildings player has afforded at some point
      unlockedBuildings: [0],

      // upgrade points accumulated per tick per instance
      upgradeRate: 0.005,

      // accumulated upgrade points
      upgrades: 0,

      // income multiplier for buildings - this should be on this instance
      upgradedBuildings: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      // how many instances are queued up to be created next instance
      toBuild: 0,

      // number of this type to complete until next property up is created
      toCompleteUntilNextInstance: Math.floor(1 + id / 3),

      // has player has reached this property type?
      unlocked: id == 0,

    }
  })
}


export const helpers = {
  // computed income for this property
  income() {
    return this.getInstances().reduce((a, b) => a + b.income(), 0)
  },

  // computed money for this property
  money() {
    return this.getInstances().reduce((a, b) => a + b.money, 0)
  },

  // get the current level of the requested research type
  research(key) {
    return this.researchTypes[key].current
  },

  // can the requested research type be increased anymore?
  researchComplete(key) {
    const research = this.researchTypes[key]
    return research.current >= research.max || research.current <= research.min
  },

  // get the cost for the next level of request research type
  researchCost(key) {
    const rank = this.researchTypes[key].rank
    const costFn = (a, b, c, d) => {
      return Math.floor(a * b + Math.pow(c, d))
    }

    if (/extra/.test(key)) {
      return costFn(rank+1, 4, 5, rank)
    }
    else if (/autoBuy/.test(key)) {
      return costFn(rank+1, 2, 1.5, rank)
    }
    else {
      return costFn(1, 1, 2, rank-1)
    }
  },

  // get description of research based on current state
  researchDescription(key) {
    const research = this.researchTypes[key]

    const autoBuy = parseInt(key.replace('autoBuy-', ''))
    const buildingName = this.buildingNames[autoBuy]

    const percentify = (n) => {
      if (!research.percent) return n
      return numeral(n*100).format('0') + '%'
    }

    const current = percentify(research.current)
    const next = percentify(research.current + research.increment)

    return research.description({
      name: titleify(this.name),
      currency: titleify(this.currencyName),
      building: titleify(buildingName),
      value: this.researchComplete(key) ? current : `${next} (${current})`
    })
  },

  // short hand for get instances
  getInstances() {
    const instances = Object.values(store.getState().instances)
    return instances.filter(i => i.type == this.id && !i.complete)
  },

  completedInstances() {
    const instances = Object.values(store.getState().instances)
    return instances.filter(i => i.type == this.id && i.complete)
  }
}
