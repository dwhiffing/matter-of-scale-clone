export default {
  name: ["hamlet", "village", "town", "city", "castle", "kingdom", "empire", "planet", "galaxy", "universe"],
  color: ["maroon", "silver", "red", "gray", "yellow", "aqua", "navy", "green", "purple", "black"],
  currency: ["deer", "lamb", "brick", "iron", "soldier", "gold", "machine", "starship", "matter", "existence"],
  researchNames: ["venison", "wool", "marble", "steel", "captain", "platinum", "circuit", "anti-matter", "AI", "transcendence"],
  baseCost: [10, 50, 200, 1000, 10000, 20000, 50000, 100000, 200000, 1000000],
  baseIncome: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
  building: [
    ['Bloodhound', 'Spearman', 'Archer', 'Tracker', 'Woodsman', 'Pathfinder', 'Scout', 'Trapper', 'Wellspring', 'River'],
    ['Shepherd', 'Sheepdog', 'Fence-Maker', 'Wolf-hunter', 'Farmhand', 'Shearer', 'Carver', 'Smoker', 'Roaster', 'Breeder'],
    ['Digger', 'River Guide', 'Bridge Builder', 'Baker', 'Heater', 'Shaper', 'Trailblazer', 'Mixer', 'Sculptor', 'Mason'],
    ['Coal Miner', 'Cart Mover', 'Tracklayer', 'Foreman', 'Prospector', 'Blacksmith', 'Ironmonger', 'Smithy', 'Smelter', 'Ironworks'],
    ['Recruiter', 'Weaponsmith', 'Armorsmith', 'Fletcher', 'Sergeant', 'Propagandist', 'Major', 'Logician', 'Major Major Major', 'General'],
    ['Panner', 'Tool salesman', 'Money Changer', 'Trader', 'Goldforge', 'Goldsmith', 'Designer', 'Gem Cutter', 'Jeweler', 'Banker'],
    ['Engineer', 'Coal Plant', 'Oil Plant', 'Wire Extruder', 'Powerline', 'Utility Worker', 'Solar Fields', 'Solar Tower', 'Nuclear Plant', 'Fusion Plant'],
    ['Astronaut', 'Astrophysicist', 'Launch Center', 'Rockets', 'Space Elevator', 'Space Station', 'Mass Driver', 'Bot Swarm', 'Asteroids', 'Space Shipyard'],
    ['Lepton Builder', 'Quark Font', 'Neutrino Guide', 'Proton Decayer', 'State Binder', 'Force Splicer', 'Gravity Hole', 'Magrathea', 'Energy Shaper', 'Reality Splitter'],
    ['Singularity', 'Netherman', 'Phaseshifter', 'Selfsplitter', 'Ascendant', 'Transcendant', 'Beyonder', 'Starchild', 'Planewalker', 'Timeshifter']
  ],
  research: {
    discount: {rank: 0, current: 0, increment: 0.05, max: 0.5, description: (o) => `${o.n} buildings cost ${o.p} less`},
    ignoreCost: {rank: 0, current: 0, increment: 1, max: 10, description: (o) => `${o.n} buildings ignore ${o.p} buildings when computing cost`},
    startMoney: {rank: 0, current: 0, increment: 200, max: 2000, description: (o) => `${o.n}s start with ${o.p} ${o.c}`},
    activeIncome: {rank: 0, current: 1, increment: 1, max: 5, description: (o) => `${o.n}s generate ${o.p} when clicking`},
    passiveIncome: {rank: 0, current: 0, increment: 5, max: 50, description: (o) => `${o.n}s have ${o.p} passive income`},
    upgradeRate: {rank: 0, current: 0, increment: 0.2, max: 2, description: (o) => `${o.n}s generate upgrade points ${o.p} faster`},
    autoComplete: {rank: 0, current: 60, increment: -5, min: 5, description: (o) => `Auto Completes ${o.n}s after ${o.p} seconds`},
    incrementCost: {rank: 0, current: 4, increment: -1, min: 1, description: (o) => `Finish ${o.p} ${o.n}s before getting next`},
    autoCost: {rank: 0, current: 2.5, increment: -0.1, min: 1, description: (o) => `Lower AutoBuy cost multiplier to ${o.p}`}
  },
  otherResearch: {
    extraHamlets: {rank: 0, current: 1, increment: 1, max: 5, description: (o) => `You can have ${o.p} ${o.n}s active at once`},
    autoBuy: {rank: 0, current: 0, increment: 0.05, max: 0.5,description: (o) => `AutoBuy ${o.p} of ${o.b} per tick`}
  }
}
