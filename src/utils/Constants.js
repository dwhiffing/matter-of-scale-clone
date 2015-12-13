export default {
  name: 'hamlet village town city castle kingdom empire planet galaxy universe'.split(' '),
  color: 'maroon silver red gray yellow aqua navy green purple black'.split(' '),
  currency: 'deer lamb brick iron soldier gold machine starship matter existence'.split(' '),
  researchNames: 'venison wool marble steel captain platinum circuit anti-matter AI transcendence'.split(' '),
  baseCost: [10, 50, 200, 1000, 10000, 20000, 50000, 100000, 200000, 1000000],
  baseIncome: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
  building: [
    'Bloodhound Spearman Archer Tracker Woodsman Pathfinder Scout Trapper Wellspring River'.split(' '),
    'Shepherd Sheepdog Fence-Maker Wolf-hunter Farmhand Shearer Carver Smoker Roaster Breeder'.split(' '),
    'Digger River-Guide Bridge-Builder Baker Heater Shaper Trailblazer Mixer Sculptor Mason'.split(' '),
    'Coal-Miner Cart-Mover Tracklayer Foreman Prospector Blacksmith Ironmonger Smithy Smelter Ironworks'.split(' '),
    'Recruiter Weaponsmith Armorsmith Fletcher Sergeant Propagandist Major Logician Major-Major-Major General'.split(' '),
    'Panner Tool-Salesman Money-Changer Trader Goldforge Goldsmith Designer Gem-Cutter Jeweler Banker'.split(' '),
    'Engineer Coal-Plant Oil-Plant Wire-Extruder Powerline Utility-Worker Solar-Fields Solar-Tower Nuclear-Plant Fusion-Plant'.split(' '),
    'Astronaut Astrophysicist Launch-Center Rockets Space-Elevator Space-Station Mass-Driver Bot-Swarm Asteroids Space-Shipyard'.split(' '),
    'Lepton-Builder Quark-Font Neutrino-Guide Proton-Decayer State-Binder Force-Splicer Gravity-Hole Magrathea Energy-Shaper Reality-Splitter'.split(' '),
    'Singularity Netherman Phaseshifter Selfsplitter Ascendant Transcendant Beyonder Starchild Planewalker Timeshifter'.split(' ')
  ],
  research: {
    discount: {
      rank: 0,
      current: 0,
      percent: true,
      increment: 0.05,
      max: 0.5,
      description: opts => `${opts.name} buildings cost ${opts.value} less`
    },
    ignoreCost: {
      rank: 0,
      current: 0,
      increment: 1,
      max: 10,
      description: opts => `${opts.name} buildings ignore ${opts.value} buildings when computing cost`
    },
    startMoney: {
      rank: 0,
      current: 0,
      increment: 200,
      max: 2000,
      description: opts => `${opts.name}s start with ${opts.value} ${opts.currency}`
    },
    activeIncome: {
      rank: 0,
      current: 1,
      increment: 1,
      max: 5,
      description: opts => `${opts.name}s generate ${opts.value} when clicking`
    },
    passiveIncome: {
      rank: 0,
      current: 0,
      increment: 5,
      max: 50,
      description: opts => `${opts.name}s have ${opts.value} passive income`
    },
    upgradeRate: {
      rank: 0,
      current: 0,
      percent: true,
      increment: 0.2,
      max: 2,
      description: opts => `${opts.name}s generate upgrade points ${opts.value} faster`
    },
    autoComplete: {
      rank: 0,
      current: 100,
      increment: -10,
      min: 0,
      description: opts => `Auto Completes ${opts.name}s after ${opts.value} seconds`
    },
    incrementCost: {
      rank: 0,
      current: 4,
      increment: -1,
      min: 1,
      description: opts => `Finish ${opts.value} ${opts.name}s before getting next`
    },
    autoCost: {
      rank: 0,
      current: 1.5,
      percent: true,
      increment: -0.05,
      min: 1,
      description: opts => `Lower AutoBuy cost multiplier to ${opts.value}`
    }
  },
  otherResearch: {
    extraHamlets: {
      rank: 0,
      current: 1,
      increment: 1,
      max: 5,
      description: opts => `You can have ${opts.value} ${opts.name}s active at once`
    },
    autoBuy: {
      rank: 0,
      current: 0,
      percent: true,
      increment: 0.05,
      max: 0.5,
      description: opts => `AutoBuy ${opts.value} of ${opts.building} per tick`
    }
  }
}
