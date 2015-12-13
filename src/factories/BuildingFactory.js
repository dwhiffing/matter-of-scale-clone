import store from 'utils/reduxStore'
import Constants from 'utils/Constants'

export default (id, type) => {
  return Constants.building[type].map((name, index) => ({

    name: name,

    // index of this building within its instance
    index: index,

    // base cost for a single, unmodified building
    baseCost: Constants.baseCost[index],

    // base income for a single, unmodified building
    baseIncome: Constants.baseIncome[index],

    // amount of this building purchased
    count: index === 0 ? 1 : 0,

    // has the player ever been able to afford this building?
    unlocked() {
      return this.getProperty().unlockedBuildings.indexOf(index) > -1
    },

    // computes cost of next building purchase
    cost() {
      const discount = 1 - this.research('discount')
      const countCost = Math.max(this.count - this.research('ignoreCost'), 0)
      const pow = Math.pow(1.1 - this.index * .008, countCost)
      return Math.floor(this.baseCost * pow * discount)
    },

    // computes how much an instance will earn from this building set per tick
    income() {
      return this.baseIncome * this.count * this.upgrades()
    },

    // amount income is multiplied by
    upgrades() {
      return this.getProperty().upgradedBuildings[index]
    },

    // amount currenty accumulated toward the next auto buy
    autoBuyAmount: 0,

    // amount spent by instance last tick to increment autoBuyAmount
    autoBuyFromLastTick() {
      return this.getInstance().autoBuy[index]
    },

    // have we accumulated enough to purchase the next building
    autoBuyComplete() {
      return this.autoBuyAmount + this.autoBuyFromLastTick() >= this.autoBuyCost()
    },

    // amount you must accumulate from auto buy to get a new building
    autoBuyCost() {
      return this.cost() * this.research('autoCost')
    },

    // most you can accumulate in a single tick
    autoBuyIncrement() {
      return this.research(`autoBuy-${this.index}`) * this.autoBuyCost()
    },

    // short-hand to instance
    getInstance() {
      return store.getState().instances[id]
    },

    // short-hand to property
    getProperty() {
      return store.getState().properties[type]
    },

    // short-hand to property research
    research(key) {
      return this.getProperty().research(key)
    }

  }))
}
