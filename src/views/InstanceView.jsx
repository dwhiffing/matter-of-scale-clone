import React from "react"
import numeral from "numeral"
import _ from "lodash"
import { attemptBuildingPurchase, buyUpgrade } from "actions/BuildingActions"
import { markInstanceComplete, triggerInstance } from "actions/InstanceActions"
import { unlockBuilding } from "actions/PropertyActions"
import { mapStateKeysToProps } from 'utils/helpers'
import { connect } from 'react-redux'
import BuildingView from 'views/BuildingView'

const stateToConnect = mapStateKeysToProps(['ui', 'instances', 'buildings', 'properties'])

const InstanceView = React.createClass({
  render() {
    let instance = this.props.instances[this.props.params.instance]
    if (!instance) return false

    if (instance.complete) {
      _.defer(() => this.props.history.push('/property'))
    }

    let {dispatch} = this.props
    let {id, type, name, money, income, currencyName, goal} = instance
    let {upgrades} = this.props.properties[type]
    let {multi} = this.props.ui

    const progress = instance.progress || 0
    const percent = progress > 100 ? 100 : numeral(progress).format("0,0")

    let classes = "center col m0 py1"
    return (
      <div className="properties-wrap center">

        <h1 className="center m1">
          {name.toUpperCase()}
        </h1>

        {progress >= 100 &&
          <div>
            <button onClick={() => {this.props.dispatch(markInstanceComplete(id))}}>
              Complete Level
            </button>
            <div>
              {instance.autoComplete}/{instance.autoCompleteDuration()}
            </div>
          </div>
        }

        <button onClick={() => {this.props.dispatch(triggerInstance(id))}}>
          triggerInstance
        </button>

        <h3 className="regular px2 m1">
          {percent}%: get {goal} income
        </h3>

        <h4 className={`m0 py1 center col regular col-4`}>
          {numeral(money).format("0,0")} {currencyName}
        </h4>

        <h4 className={`m0 py1 center col regular col-4`}>
          {instance.income()} {currencyName}/sec
        </h4>

        <h4 className={`m0 py1 center col regular col-4`}>
          {numeral(upgrades).format("0,0.00")}U
        </h4>

        <h5 className={`m0 py1 center col col-4`}>
          Building
        </h5>

        <h5 className={`m0 py1 center col col-2`}>
          #
        </h5>

        <h5 className={`m0 py1 center col col-3`}>
          Cost ({currencyName})
        </h5>

        <h5 className={`m0 py1 center col col-3`}>
          Income
        </h5>

        <div>
          {instance.buildings().map((building, index) => {
            const id = this.props.params.instance
            const canAffordUpgrade = building.upgrades() <= upgrades || building.count == 0
            const canAffordBuy = (building.cost() * multi) <= money
            return (
              <BuildingView
                key={index}
                building={building}
                multi={multi}
                canAffordBuy={canAffordBuy}
                canAffordUpgrade={canAffordUpgrade}
                unlockBuilding={() => {dispatch(unlockBuilding(instance.type, index))}}
                clickUpgrade={() => dispatch(buyUpgrade([instance.type, index, building.upgrades()]))}
                clickBuy={() => dispatch(attemptBuildingPurchase([id, id*10 + index, building.cost()]))}>
              </BuildingView>
            )
          })}
        </div>
      </div>
    )
  }
})

export default connect(stateToConnect)(InstanceView)
