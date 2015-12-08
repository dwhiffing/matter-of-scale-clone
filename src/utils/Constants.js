export default {
  name: ["hamlet", "village", "town", "city", "castle", "county", "duchy", "archduchy", "kingdom", "empire", "planet", "system", "quadrant", "galaxy", "universe", "multiverse"],
  color: ["maroon", "silver", "red", "gray", "green", "yellow", "aqua", "black", "navy", "fuchsia", "blue", "purple", "olive", "green", "teal", "black"],
  currency: ["deer", "lamb", "brick", "iron", "soldier", "gold", "energy", "ship", "machine", "research", "starship", "wormhole", "software", "portal", "matter", "existence"],
  researchNames: ["venison", "wool", "marble", "steel", "captain", "platinum", "circuit", "plane", "factory", "idea", "FTL Drive", "gateway", "AI", "archway", "force", "transcendence"],
  baseCost: [10, 50, 200, 1000, 10000, 20000, 50000, 100000, 200000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000],
  baseIncome: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 1000, 1000, 1000, 1000, 1000, 1000 ],
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
  research: [
    {name: "discount", current: 0, increment: 0.05, max: 0.75, cost: 5, description: "NAME buildings cost NEXT (from CURRENT) less"},
    {name: "startingCurrency", current: 0, increment: 200, max: 2000, cost: 5, description: "NAMEs start with NEXT (from CURRENT) CURRENCY"},
    {name: "startingIncome", current: 0, increment: 5, max: 50, cost: 5, description: "NAMEs start with NEXT (from CURRENT) income"},
    {name: "upgradeSpeed", current: 0, increment: 0.15, max: 2, cost: 5, description: "NAMEs generate upgrade points NEXT (from CURRENT) faster"},
    {name: "extra", current: 1, increment: 1, max: 5, cost: 5, description: "You can have NEXT (from CURRENT) NAMEs active at once"},
    {name: "autoComplete", current: -1, increment: 120, max: 120, cost: 5, description: "Auto Completes NAMEs after NEXT (from CURRENT) seconds"},
    {name: "autoDiscount", current: -2.5, increment: 0.05, max: 0, cost: 5, description: "Auto-purchased buildings cost NEXT (from CURRENT)"}
  ]
}
