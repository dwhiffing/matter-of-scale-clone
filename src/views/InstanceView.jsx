import React from "react"
import _ from "lodash"
import { format as f } from "utils/helpers"

import BuildingLineItem from 'views/components/BuildingLineItem'

export default React.createClass({
  render() {
    const instance = this.props.instances[this.props.params.instance]

    if (!instance) return false
    if (instance.complete) {
      _.defer(() => this.props.history.push('/property'))
    }

    const { doBuildingPurchase, doUpgradePurchase, unlockBuilding} = this.props
    const { id, type, name, money, income, currencyName, goal } = instance
    const availableUpgrades = this.props.properties[type].upgrades
    const multi = this.props.ui.multi
    return (
      <div className="properties-wrap center">

        <h1 className="center m1">
          {name.toUpperCase()}
        </h1>

        {instance.progress >= 100 && // if instance is complete
          <div>
            <button onClick={() => {this.props.markInstanceComplete(id)}}>
              Complete Level
            </button>
            <div>
              {instance.autoComplete}/{instance.autoCompleteDuration()}
            </div>
          </div>
        }

        <button onClick={() => {this.props.triggerInstance(id)}}>
          triggerInstance
        </button>

        <h3 className="regular px2 m1">
          {f(instance.progress, "0,0")}%: {goal.description()}
        </h3>

        <h4 className="center col m0 py1 regular col-4">
          {f(money, "0,0")} {currencyName}
        </h4>

        <h4 className="center col m0 py1 regular col-4">
          {instance.income()} {currencyName}/sec
        </h4>

        <h4 className="center col m0 py1 regular col-4">
          {f(availableUpgrades, "0,0.00")}U
        </h4>

        <h5 className="center col m0 py1 col-4">
          Building
        </h5>

        <h5 className="center col m0 py1 col-2">
          #
        </h5>

        <h5 className="center col m0 py1 col-3">
          Cost ({currencyName})
        </h5>

        <h5 className="center col m0 py1 col-3">
          Income
        </h5>

        <div>
          {instance.buildings().map((building, index) => {
            return (
              <BuildingLineItem key={index}
                building={building}
                instance={instance}
                index={index}
                type={type}
                multi={multi}
                availableUpgrades={availableUpgrades}
                doUpgradePurchase={doUpgradePurchase}
                doBuildingPurchase={doBuildingPurchase}
                unlockBuilding={unlockBuilding}>
              </BuildingLineItem>
            )
          })}
        </div>
      </div>
    )
  }
})
