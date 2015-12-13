import store from 'utils/reduxStore'
import Constants from 'utils/Constants'

// baseCost: [10, 50, 200, 1000, 10000, 20000, 50000, 100000, 200000, 1000000],
// baseIncome: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
// building: [
//   'Bloodhound Spearman Archer Tracker Woodsman Pathfinder Scout Trapper Wellspring River'.split(' '),
//   'Shepherd Sheepdog Fence-Maker Wolf-hunter Farmhand Shearer Carver Smoker Roaster Breeder'.split(' '),
//   'Digger River-Guide Bridge-Builder Baker Heater Shaper Trailblazer Mixer Sculptor Mason'.split(' '),
//   'Coal-Miner Cart-Mover Tracklayer Foreman Prospector Blacksmith Ironmonger Smithy Smelter Ironworks'.split(' '),
//   'Recruiter Weaponsmith Armorsmith Fletcher Sergeant Propagandist Major Logician Major-Major-Major General'.split(' '),
//   'Panner Tool-Salesman Money-Changer Trader Goldforge Goldsmith Designer Gem-Cutter Jeweler Banker'.split(' '),
//   'Engineer Coal-Plant Oil-Plant Wire-Extruder Powerline Utility-Worker Solar-Fields Solar-Tower Nuclear-Plant Fusion-Plant'.split(' '),
//   'Astronaut Astrophysicist Launch-Center Rockets Space-Elevator Space-Station Mass-Driver Bot-Swarm Asteroids Space-Shipyard'.split(' '),
//   'Lepton-Builder Quark-Font Neutrino-Guide Proton-Decayer State-Binder Force-Splicer Gravity-Hole Magrathea Energy-Shaper Reality-Splitter'.split(' '),
//   'Singularity Netherman Phaseshifter Selfsplitter Ascendant Transcendant Beyonder Starchild Planewalker Timeshifter'.split(' ')
// ],

export default (id, type) => {
  return Constants.building[type].map((name, index) => ({

    name: name,

    propertyId: type,

    instanceId: id,

    // index of this building within its instance
    index: index,

    // base cost for a single, unmodified building
    baseCost: Constants.baseCost[index],

    // base income for a single, unmodified building
    baseIncome: Constants.baseIncome[index],

    // amount of this building purchased
    count: index === 0 ? 1 : 0,

    // amount currenty accumulated toward the next auto buy
    autoBuyAmount: 0,

  }))
}

export const helpers = {
  // has the player ever been able to afford this building?
  unlocked() {
    return this.getProperty().unlockedBuildings.indexOf(this.index) > -1
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
    return this.getProperty().upgradedBuildings[this.index]
  },

  // amount spent by instance last tick to increment autoBuyAmount
  autoBuyFromLastTick() {
    return this.getInstance().autoBuy[this.index]
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
    return store.getState().instances[this.instanceId]
  },

  // short-hand to property
  getProperty() {
    return store.getState().properties[this.propertyId]
  },

  // short-hand to property research
  research(key) {
    return this.getProperty().research(key)
  }
}
