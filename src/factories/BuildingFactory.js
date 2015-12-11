import store from 'utils/reduxStore'
import Constants from 'utils/Constants'

export default (type) => {
  return Constants.building[type].map((name, index) => ({
    name: name,
    index: index,
    baseCost: Constants.baseCost[index],
    baseIncome: Constants.baseIncome[index],
    count: index === 0 ? 1 : 0,
    autoBuyAmount: 0,
    getProperty() {
      return store.getState().properties[type]
    },
    research(key) {
      return this.getProperty().research(key)
    },
    unlocked() {
      return this.getProperty().unlockedBuildings.indexOf(index) > -1
    },
    costMultiplier() {
      return this.getProperty().autoBuyCostMultiplier
    },
    autoBuyComplete() {
      return this.autoBuyAmount >= this.autoBuyCost()
    },
    autoBuyCost() {
      return this.cost() * this.research('autoCost')
    },
    autoBuyIncrement() {
      return this.research(`autoBuy-${this.index}`) * this.autoBuyCost()
    },
    upgrades() {
      return this.getProperty().upgradedBuildings[index]
    },
    cost() {
      const discount = 1 - this.research('discount')
      const count = Math.max(this.count - this.research('ignoreCost'), 0)
      const pow = Math.pow(1.1 - this.index * .008, count)
      return Math.floor(this.baseCost * pow * discount)
    },
    income() {
      return this.baseIncome * this.count * this.upgrades()
    }
  }))
}
