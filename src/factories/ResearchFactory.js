// TODO: move all research creation logic here
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
specialResearch: {
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
