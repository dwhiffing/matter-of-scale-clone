import store from 'utils/reduxStore'
import u from 'updeep'

// base for all cost compution
export const baseCost = [10, 50, 200, 1000, 10000, 20000, 50000, 100000, 200000, 1000000]

// base for all income compution
export const baseIncome = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]

// display name of buildings
export const buildingNames = [
  ['Bloodhound','Spearman','Archer','Tracker','Woodsman','Pathfinder','Scout','Trapper','Wellspring','River'],
  ['Shepherd','Sheepdog','Fence-Maker','Wolf-hunter','Farmhand','Shearer','Carver','Smoker','Roaster','Breeder'],
  ['Digger','River-Guide','Bridge-Builder','Baker','Heater','Shaper','Trailblazer','Mixer','Sculptor','Mason'],
  ['Coal-Miner','Cart-Mover','Tracklayer','Foreman','Prospector','Blacksmith','Ironmonger','Smithy','Smelter','Ironworks'],
  ['Recruiter','Weaponsmith','Armorsmith','Fletcher','Sergeant','Propagandist','Major','Logician','Major-Major','General'],
  ['Panner','Tool-Salesman','Money-Changer','Trader','Goldforge','Goldsmith','Designer','Gem-Cutter','Jeweler','Banker'],
  ['Engineer','Coal-Plant','Oil-Plant','Wire-Extruder','Powerline','Utility-Worker','Solar-Fields','Solar-Tower','Nuclear-Plant','Fusion-Plant'],
  ['Astronaut','Astrophysicist','Launch-Center','Rockets','Space-Elevator','Space-Station','Mass-Driver','Bot-Swarm','Asteroids','Space-Shipyard'],
  ['Lepton-Builder','Quark-Font','Neutrino-Guide','Proton-Decayer','State-Binder','Force-Splicer','Gravity-Hole','Magrathea','Energy-Shaper','Reality-Splitter'],
  ['Singularity','Netherman','Phaseshifter','Selfsplitter','Ascendant','Transcendant','Beyonder','Starchild','Planewalker','Timeshifter']
]

export default (id, type) => {

  // these properties are persisted to localStorage
  // TODO: name, baseCost, baseIncome should be rehydrated, not persisted
  return buildingNames[type].map((name, index) => ({

    // index of this building within its instance
    index: index,

    // the property type this building belonds to
    propertyId: type,

    // instance id this building belongs to
    instanceId: id,

    // amount of this building purchased
    count: index === 0 ? 1 : 0,

    // amount currenty accumulated toward the next auto buy
    autoBuyAmount: 0,

  }))
}

export const rehydrate = (building) => {
  const { index, propertyId } = building
  const rehydratedBuilding = u(building, helpers)

  return Object.assign({}, {

    name: buildingNames[propertyId][index],

    baseCost: baseCost[index],

    baseIncome: baseIncome[index],

  }, rehydratedBuilding)
}

// helpers are assigned to each obj as it is created / loaded
const helpers = {

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

  // computes how much an instance will earn from this building set per tick per building
  incomeForSingle() {
    return this.baseIncome * this.upgrades()
  },

  // amount income is multiplied by
  upgrades() {
    return this.getInstance().upgradedBuildings[this.index]
  },

  // amount income is multiplied by
  upgradeCost() {
    const num = this.upgrades() * (1-this.research('upgradeCost'))
    return Math.floor(num * 100) / 100
  },

  // amount spent by instance last tick to increment autoBuyAmount
  autoBuyFromLastTick() {
    return this.getInstance().autoBuy[this.index]
  },

  // have we accumulated enough to purchase the next building
  autoBuyComplete() {
    return this.autoBuyAmount + this.autoBuyFromLastTick() >= this.autoBuyCost()
  },

  // Progress through the current autobuy cycle
  autoBuyPercent() {
    return (this.autoBuyAmount / (this.research('autoCost') * this.cost())) * 100
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
