import React from "react"
import _ from "numeral"

export default React.createClass({
  generateItem(obj, i) {
    let property = this.state.properties[this.state.cursor[0]]
    if (typeof obj === 'string') obj = property.researchUpgrades[obj]
    if (obj.current === obj.max || obj instanceof Array) return false

    let next = obj.current + obj.increment
    let isPercent = obj.increment % 1 === 0
    next = isPercent ? next : `${_((obj.current + obj.increment)*100).format('0')}%`
    
    let current = isPercent ? obj.current : `${_(obj.current*100).format('0')}%`
    let research = property.researchName

    let desc = obj.description.replace('NAME', this.state.properties[this.state.cursor[0]].name)
        desc = desc.replace('NEXT', next)
        desc = desc.replace('CURRENT', current)
        desc = desc.replace('CURRENCY', research)
        desc = desc.replace('BUILDING', property.buildings[i])

    return (
      <div key={i} className="p1 border-bottom border-top clearfix" onClick={() => this.props.buyResearch(obj.name)}>
        <div className="col col-9">
          {desc}
        </div>
        <div className="col col-3">
          <span className='right red'>{obj.cost} {research}</span>
        </div>
      </div>
    )
  },

  render() {
    let property = this.state.properties[this.state.cursor[0]]
    return (
      <div className="">
        <div className="h2 bold center p2">{property.name.toUpperCase()} RESEARCH</div>
        {Object.keys(property.researchUpgrades).map(this.generateItem)}
        {property.researchUpgrades.auto.map(this.generateItem)}
      </div>
    )
  }
})