// TODO: move all goal creation logic here
goals: {
  income: {
    amountScale() {
      const nth = this.instance() ? this.instance().nth : 1
      return Math.min(20, Math.ceil(nth / 10))
    },
    goal() {
      return this.amount * this.amountScale() * 10
    },
    target() {
      return this.instance().income()
    },
    description() {
      return `get ${this.goal()} income`
    }
  },
  money: {
    amountScale() {
      const nth = this.instance() ? this.instance().nth : 1
      return Math.min(100, Math.ceil(nth / 5))
    },
    goal() {
      return this.amount * this.amountScale() * 10
    },
    target() {
      return this.instance().money
    },
    description() {
      return `get ${this.goal()} money`
    }
  },
  buildingCount: {
    amountScale() {
      const nth = this.instance() ? this.instance().nth : 1
      const amountClamp = (5 - Math.min(5, Math.ceil(nth / 10)))
      return (5 - Math.floor(this.building / 2)) - amountClamp
    },
    goal() {
      return this.amount
    },
    target() {
      return this.getBuilding().count
    },
    description() {
      return `get ${this.goal()} ${this.getBuilding().name}`
    }
  },
  buildingIncome: {
    amountScale() {
      const nth = this.instance() ? this.instance().nth : 1
      const amountClamp = Math.min(1, Math.ceil(nth / 20))
      return (5 - Math.floor(this.building / 2)) * amountClamp
    },
    goal() {
      return this.amount * this.getBuilding().baseIncome
    },
    target() {
      return this.getBuilding().income()
    },
    description() {
      return `get ${this.goal()} income with ${this.getBuilding().name}`
    }
  }
},
