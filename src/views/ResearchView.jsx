import React from "react"
import numeral from "numeral"
import Constants from 'utils/Constants'
import { buyResearch } from "actions/PropertyActions"
import { mapStateKeysToProps } from 'utils/helpers'
import { connect } from 'react-redux'

const stateToConnect = mapStateKeysToProps(['properties'])
const format = (string, format) => {
  return numeral(string).format(format)
}

const ResearchView = React.createClass({
  generateItem(ob, i) {
    let property = this.props.properties[this.props.params.property]
    let obj
    if (typeof ob === 'string') obj = property.researchTypes[ob]

    const next = obj.current + obj.increment
    const isPercent = obj.increment % 1 === 0
    const isComplete = obj.current === obj.max || obj.current === obj.min
    let desc = obj.description.replace('NAME', property.name)
    desc = desc.replace('CURRENCY', property.researchName)
    desc = desc.replace('BUILDING', property.buildingNames[i])

    if (isComplete) {
      desc = desc.replace('NEXT', isPercent ? obj.current : `${format(obj.current*100, '0')}%`)
      desc = desc.replace('(CURRENT)', '')
    } else {
      desc = desc.replace('NEXT', isPercent ? next : `${format(next*100, '0')}%`)
      desc = desc.replace('CURRENT', isPercent ? obj.current : `${format(obj.current*100, '0')}%`)
    }

    let getCost = (rank, name) => {
      if (name === 'extra') {
        return Math.floor((rank+1) * 4 + Math.pow(5, (rank)))
      }
      if (/autoBuy/.test(name)) {
        return Math.floor((rank+1) * 2 + Math.pow(1.5, (rank)))
      }
      return Math.floor(1+ Math.pow(2, (rank-1)));
    }

    return (
      <div key={i} className={`p1 border-bottom border-top clearfix ${isComplete ? 'muted' : ''}`} onClick={() => this.props.dispatch(buyResearch(property.id, ob))}>
        <div className="col col-9">
          {desc}
        </div>
        <div className="col col-3">
          {!isComplete &&
            <span className='right red'>
              {getCost(obj.rank, ob)} {property.researchName}
            </span>
          }
        </div>
      </div>
    )
  },

  render() {
    let property = this.props.properties[this.props.params.property]
    return (
      <div>
        <div className="h2 bold center p2">
          {property.name.toUpperCase()} RESEARCH
        </div>

        {Object.keys(property.researchTypes).map(this.generateItem)}
      </div>
    )
  }
})

export default connect(stateToConnect)(ResearchView)
