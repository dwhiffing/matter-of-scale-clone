import {arrayFromRange} from 'utils/helpers'

const research = {
  discount: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.1,
    max: 0.5,
    description: "{name} buildings cost {value} less"
  },
  ignoreCost: {
    rank: 0,
    current: 0,
    increment: 2,
    max: 10,
    description: "{name} buildings ignore {value} buildings when computing cost"
  },
  startMoney: {
    rank: 0,
    current: 0,
    increment: 200,
    max: 1000,
    description: "{name}s start with {value} {currency}"
  },
  passiveIncome: {
    rank: 0,
    current: 0,
    increment: 10,
    max: 50,
    description: "{name}s have {value} passive income"
  },
  upgradeCost: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.1,
    max: 0.5,
    description: "{name}s upgrades cost {value} less"
  },
  autoComplete: {
    rank: 0,
    current: 50,
    increment: -10,
    min: 0,
    description: "Auto Completes {name}s after {value} seconds"
  },
  incrementCost: {
    rank: 0,
    current: 5,
    increment: -1,
    min: 1,
    description: "Finish {value} {name}s before getting next"
  },
  autoCost: {
    rank: 0,
    current: 1.5,
    percent: true,
    increment: -0.1,
    min: 1,
    description: "Lower AutoBuy cost multiplier to {value}"
  }
}

const specialResearch = {
  extraHamlets: {
    rank: 0,
    current: 1,
    increment: 1,
    max: 5,
    description: "You can have {value} {name}s active at once"
  },
  autoBuy: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.1,
    max: 0.5,
    description: "AutoBuy {value} of {building} per tick"
  }
}


export default (id) => {
  // TODO: clean this up a bit
  let researchTypes = research
  if (id === 0) {
    researchTypes = Object.assign({
      extra: specialResearch.extraHamlets
    }, researchTypes)
  }
  [0,1,2,3,4,5,6,7,8,9].forEach((b, i) => {
    researchTypes['autoBuy-'+i] = specialResearch.autoBuy
  })
  return researchTypes
}
