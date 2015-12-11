import store from 'utils/reduxStore'
import Constants from 'utils/Constants'

export default () => {
  return Constants.name.map((name, id) => {
    const buildingNames = Constants.building[id]
    const getInstances = () => Object.values(store.getState().instances).filter(i => i.type == id && !i.complete)

    // TODO: This needs to be cleaned up
    let researchTypes = Constants.research
    if (id === 0) {
      researchTypes = Object.assign({
        extra: Constants.otherResearch.extraHamlets
      }, researchTypes)
    }
    buildingNames.forEach((b, i) => {
      researchTypes['autoBuy-'+i] = Constants.otherResearch.autoBuy
    })
    // end cleanup

    return {
      id: id,
      name: name,
      color: Constants.color[id],
      currencyName: Constants.currency[id],
      researchName: Constants.researchNames[id],
      buildingNames: buildingNames,
      researchTypes: researchTypes,
      unlocked: id == 0,
      upgradedBuildings: [1,1,1,1,1,1,1,1,1,1],
      unlockedBuildings: [0],
      upgradeRate: 0.005,
      researchMoney: 0,
      upgrades: 0,
      toBuild: 0,
      toCompleteUntilNextInstance: Math.floor(1 + id / 3),
      instances: getInstances,
      research(key) {
        return this.researchTypes[key].current
      },
      income() {
        return getInstances().reduce((a, b) => a + b.income(), 0)
      },
      money() {
        return getInstances().reduce((a, b) => a + b.money, 0)
      }
    }
  })
}
