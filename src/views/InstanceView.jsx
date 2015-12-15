import React from "react"
import _ from "lodash"
import { format as f, titleify, Color } from "utils/helpers"
import { ProgressBar } from 'react-bootstrap'
import BuildingLineItem from 'views/components/BuildingLineItem'

export default React.createClass({
  render() {
    const instance = this.props.instances[this.props.params.instance]

    if (!instance) return false

    const { doBuildingPurchase, doUpgradePurchase, unlockBuilding} = this.props
    const { id, type, money, currencyName, goal } = instance
    const { researchMoney, researchName, color } = instance.property()
    const { upgrades, multi } = this.props.ui

    const name = titleify(instance.name)
    const progress = Math.floor(Math.min(100, instance.progress))
    const income = instance.income()
    const complete = instance.progress >= 100
    const autoCompleteProgress = 100 - instance.autoCompleteProgress()

    const researchLink = (
      <a href={`#/research/${instance.type}`}>{name} Improvements</a>
    )

    const currencyDiv = <Color>{titleify(currencyName)}</Color>
    const researchDiv = <Color>{titleify(researchName)}</Color>

    return (
      <div className={instance.property().name}>
        <div className="text-center">

          <h2>{name}</h2>

          {complete &&
            <div onClick={() => {this.props.markInstanceComplete(id)}}>

              <ProgressBar
                className="pointer"
                now={autoCompleteProgress}
                label="%(percent)s%">
              </ProgressBar>

              <h6>Click bar to complete level or wait for auto-complete</h6>

            </div>
          }

          {!complete &&
            <ProgressBar now={progress} label="%(percent)s%" />
          }

          <h5>Goal: {goal.description}</h5>

        </div>

        <p>Contains {f(money, "0,0")} {currencyDiv} producing {income}  {currencyDiv} / sec</p>

        <p>{researchMoney} {researchDiv} available for {researchLink}.</p>

        <table className="table">

          <thead><tr>
            <th>Building</th>
            <th>#</th>
            <th>Cost</th>
            <th>Income</th>
            <th>/ Tick</th>
          </tr></thead>

          <tbody>
            {instance.buildings().map((building, index) => {
              return (
                <BuildingLineItem key={index}
                  building={building}
                  instance={instance}
                  index={index}
                  type={type}
                  multi={multi}
                  upgrades={upgrades}
                  doUpgradePurchase={doUpgradePurchase}
                  doBuildingPurchase={doBuildingPurchase}
                  unlockBuilding={unlockBuilding}>
                </BuildingLineItem>
              )
            })}
          </tbody>

        </table>
      </div>
    )
  }
})
