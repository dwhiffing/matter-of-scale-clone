import Constants from 'utils/Constants'
import { reducerCreator } from 'utils/reduxHelpers'

let initResearch = (type, i) => {
  upgrades.auto = type.buildings.map((b, i) => {
    return {cost: 5, current: 0, name: `auto-${i}`, increment: Math.ceil(Math.pow(1.6,i+1)), description: `Reserves NEXT CURRENCY/sec (from CURRENT) to buy BUILDING` }
  })
}

const initialState = Constants.research

const ResearchReducers = {

  buyResearch(upgrade) {
    let propertyType = this.getInstance().getCurrentPropertyType()
    upgrade = propertyType.researchUpgrades[upgrade]
    if (upgrade.current < upgrade.max) {
      upgrade.current = +(upgrade.current+upgrade.increment).toPrecision(2)
      upgrade.cost = Math.ceil(Math.pow(upgrade.cost, 1.1))
      this.emitChange()
    }
  }

}

export default reducerCreator(ResearchReducers, initialState)