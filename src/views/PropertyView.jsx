import React from "react"
import _ from "numeral"
import Constants from 'utils/Constants'

import BuildingView from 'views/BuildingView'

import { mapStateKeysToProps } from 'utils/reduxHelpers'
import { connect } from 'react-redux'

const stateToConnect = mapStateKeysToProps(['properties', 'instances'])

const PropertyView = React.createClass({
  render() {
    let {instances, properties} = this.props
    let propertiesArr = Object.keys(properties).map(i => properties[i]).concat([])
    let instancesArr = Object.keys(instances).map(i => instances[i]).concat([])
    return (
      <div className="properties-wrap">
        {propertiesArr.map((obj, i) => {
          if (!instancesArr[i] || instancesArr[i].length == 0) return false

          let {next, name, currencyName, researchName, research, color} = obj
          next = next > 0 ? `(left: ${next})` : ""

          let income = 0, money = 0
          instancesArr.forEach(i => {
            income += i.income
            money += i.money
          })

          return (
            <div className="px1 mb2 h2 black" key={i}>

              <span className="caps">
                {name}s
              </span>

              {i !== 0 &&
                <span className="h6 gray">
                  {next}
                </span>
              }

              <div className="px1 h4">

                <span className={`h4 ${color} shadow caps`}>
                  {currencyName}:
                </span>

                <span className="h3"> {_(money).format("0,0")} </span>
                <span className="h5"> ({income}/sec) </span>

              </div>

              <div className="px1 h4">

                <span className={`h5 ${color} shadow caps`}>
                  {researchName}:
                </span>

                <span className="h5">
                  {research}
                </span>

                <a onClick={() => this.props.history.push(`/research/${i}`)} className="m1 h4 blue">
                  RESEARCH
                </a>

              </div>

              <div className='px2 h3'>
                Instances:
              </div>

              <ul className="px3 clearfix">
                {instancesArr.map((obj, i) => {
                  return (
                    <li key={i} className="bar-wrap col col-12 left-align">
                      <a onClick={() => this.props.history.push(`/property/${i}`)}>
                        {_(obj.money).format("0,0")} | {obj.income}/s
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
})

export default connect(stateToConnect)(PropertyView)
