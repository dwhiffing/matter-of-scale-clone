import React from "react"
import {Link} from "react-router"
import { buyBuilding } from "actions/InterfaceActions"
import _ from "numeral"

import BuildingsView from 'views/BuildingsView'

import { mapStateKeysToProps } from 'utils/reduxHelpers'
import { connect } from 'react-redux'

const stateToConnect = mapStateKeysToProps(['ui', 'instances', 'buildings'])

const PropertyHandler = React.createClass({
  render() {
    
    let paramInstance = this.props.params.instance
    let property = this.props.instances[paramInstance]
    let buildings = this.props.buildings[paramInstance]

    if (!property) return false
    let {name, money, income, progress, currency, goal, upgradePoints} = property
    let {multi} = this.props.ui
    progress = progress || 0

    let classes1 = "regular center m0 col col-4 py1"
    let classes2 = "center col m0 py1"

    return (
      <div className="properties-wrap center">
        
        <h1 className="center m1">
          {name.toUpperCase()}
        </h1>

        {progress >= 100 &&
          <button onClick={this.props.finishProperty}>Complete Level</button>
        }

        <h3 className="regular px2 m1">
          {progress > 100 ? 100 : _(progress).format("0,0")}%: get {goal} income
        </h3>
        
        <h4 className={classes1}>
          {_(money).format("0,0")} {currency}
        </h4>

        <h4 className={classes1}>
          {income} {currency}/sec
        </h4>

        <h4 className={classes1}>
          {_(upgradePoints).format("0,0.00")}U
        </h4>

        <h5 className={`col-1 ${classes2}`}>
          Up
        </h5>

        <h5 className={`col-4 ${classes2}`}>
          Building
        </h5>
        
        <h5 className={`col-1 ${classes2}`}>
          #
        </h5>
        
        <h5 className={`col-2 ${classes2}`}>
          Cost ({currency})
        </h5>
        
        <h5 className={`col-2 ${classes2}`}>
          Income
        </h5>

        <h5 className={`col-2 ${classes2}`}>
          Total Income ({currency})
        </h5>

        <BuildingsView buildings={buildings} index={parseInt(paramInstance)} dispatch={this.props.dispatch} money={money} multi={multi} upgradePoints={upgradePoints} paramInstance={paramInstance} />
        
      </div>
    )
  }
})

export default connect(stateToConnect)(PropertyHandler)
