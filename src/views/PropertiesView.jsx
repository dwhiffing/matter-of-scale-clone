import React from "react"
import { Link } from "react-router"
import _ from "numeral"
import Constants from 'utils/Constants'

import InstanceActions from 'actions/InstanceActions'
import BuildingsView from 'views/BuildingsView'
import BuildingActions from 'actions/BuildingActions'

import { mapStateKeysToProps, mapActionCreatorsToProps } from 'utils/reduxHelpers'
import { connect } from 'react-redux'

const stateToConnect = mapStateKeysToProps(['properties', 'instances'])

const PropertiesView = React.createClass({
  render() {
    let {instances, properties} = this.props
    return (
      <div className="properties-wrap">
        {properties.map((obj, i) => {
          if (!instances[i] || instances[i].length == 0) return false

          let {next, name, currency, research, researchPoints, color} = obj
          next = next > 0 ? `(left: ${next})` : ""

          let income = 0, money = 0
          instances.forEach(i => {
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
                  {currency}:
                </span>
                
                <span className="h3"> {_(money).format("0,0")} </span>
                <span className="h5"> ({income}/sec) </span>

              </div>

              <div className="px1 h4">
                
                <span className={`h5 ${color} shadow caps`}>
                  {research}:
                </span>
                
                <span className="h5">
                  {researchPoints}
                </span>
                
                <Link to={`/research/${i}`} className="m1 h4 blue">
                  RESEARCH
                </Link>

              </div>

              <div className='px2 h3'>
                Instances:
              </div>

              <ul className="px3 clearfix">
                {instances.map((obj, j) => {
                  return (
                    <li key={i} className="bar-wrap col col-12 left-align">
                      <Link to={`/property/${j}`}>
                        {_(obj.money).format("0,0")} | {obj.income}/s
                      </Link>
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

export default connect(stateToConnect)(PropertiesView)