export default {
  name: ["hamlet", "village", "town", "city", "castle", "county", "duchy", "archduchy", "kingdom", "empire", "planet", "system", "quadrant", "galaxy", "universe", "multiverse"],
  color: ["maroon", "silver", "red", "gray", "green", "yellow", "aqua", "black", "navy", "fuchsia", "blue", "purple", "olive", "green", "teal", "black"],
  currency: ["deer", "lamb", "brick", "iron", "soldier", "gold", "energy", "ship", "machine", "research", "starship", "wormhole", "software", "portal", "matter", "existence"],
  researchNames: ["venison", "wool", "marble", "steel", "captain", "platinum", "circuit", "plane", "factory", "idea", "FTL Drive", "gateway", "AI", "archway", "force", "transcendence"],
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
    ['Sailor', 'Shipwright', 'Sailor', 'Foreman', 'Navigator', 'Commandant', 'Admiral', 'Canal', 'Drydock', 'Wetdock'],
    ['Worker', 'Repairman', 'Conveyor', 'Manager', 'Break Room', 'Machinist', 'Toolsmith', 'Robot', 'Automation', 'Air Conditioner'],
    ['Intern', 'Undergraduate', 'Graduate', 'Postgraduate', 'Biologist', 'Chemist', 'Physicist', 'Mathematician', 'University', 'Research Grants'],
    ['Astronaut', 'Astrophysicist', 'Launch Center', 'ROCKETS!!!', 'Space Elevator', 'Space Station', 'Mass Driver', 'Bot Swarm', 'Asteroids', 'Space Shipyard'],
    ['Theorist', 'Deep Field Scanner', 'Gravity Observatory', 'Zero Point Drive', 'Hyperspanner', 'Sonic Screwdriver', 'Negative Energy', 'Exotic Matter', 'Space Cutter', 'Time Theory'],
    ['Logician', 'Programmer', 'Mathematician', 'Compiler', 'COBOL', 'C', 'C++', 'Java', 'D', 'JavaScript'],
    ['Field Jammer', 'Space Folder', 'Tear Sealer', 'Schism Guide', 'Crusher', 'Wayfinder', 'Quantum Tunnel', 'Matter Gate', 'Slipstream', 'Traveler'],
    ['Lepton Builder', 'Quark Font', 'Neutrino Guide', 'Proton Decayer', 'State Binder', 'Force Splicer', 'Gravity Hole', 'Magrathea', 'Energy Shaper', 'Reality Splitter'],
    ['Singularity', 'Netherman', 'Phaseshifter', 'Selfsplitter', 'Ascendant', 'Transcendant', 'Beyonder', 'Starchild', 'Planewalker', 'Timeshifter']
  ],
  research: {
    discount: {rank: 0, current: 0, increment: 0.1, max: 0.9, description: "NAME buildings cost NEXT (CURRENT) less"},
    ignoreCost: {rank: 0, current: 0, increment: 1, max: 10, description: "NAME buildings ignore NEXT (CURRENT) buildings when computing cost"},
    startMoney: {rank: 0, current: 0, increment: 200, max: 2000, description: "NAMEs start with NEXT (CURRENT) CURRENCY"},
    activeIncome: {rank: 0, current: 1, increment: 1, max: 5, description: "NAMEs generate NEXT (CURRENT) when clicking"},
    passiveIncome: {rank: 0, current: 0, increment: 5, max: 50, description: "NAMEs have NEXT (CURRENT) passive income"},
    upgradeRate: {rank: 0, current: 0, increment: 0.2, max: 2, description: "NAMEs generate upgrade points NEXT (CURRENT) faster"},
    autoComplete: {rank: 0, current: 60, increment: -5, min: 5, description: "Auto Completes NAMEs after NEXT (CURRENT) seconds"},
    autoCost: {rank: 0, current: 2.5, increment: -0.1, min: 1, description: "Lower AutoBuy cost multiplier to NEXT (CURRENT)"}
  }
}
