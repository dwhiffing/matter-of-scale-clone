import React from "react"
import _ from "lodash"

export default React.createClass({
  render() {
    if (!this.props.building) return false

    let {building, clickUpgrade, clickBuy, unlockBuilding} = this.props
    let buttonClass = this.props.canAffordBuy ? "bg-green" : "bg-red"
    let upgradeClass = this.props.canAffordUpgrade ? "bg-green" : "bg-red"
    let showUpgradeButton = building.count > 0

    let percent = building.autoBuyAmount / (building.research('autoCost') * building.cost())

    if (!building.unlocked() && this.props.canAffordBuy) {
      _.defer(() => unlockBuilding())
    }

    return (
      <div
      className={`bar-wrap col col-12 right-align ${building.unlocked() ? "" : "muted"}`}>
        {showUpgradeButton &&
          <button
          className={`button py2 white col col-2 ${upgradeClass}`}
          onClick={clickUpgrade}>
            {building.upgrades()}U x{Math.pow(2, building.upgrades())}
          </button>
        }

        <button
        className={`button relative py2 col col-3 ${buttonClass} ${showUpgradeButton ? '' : 'col-5'}`}
        type="button" onClick={clickBuy}>
          {building.unlocked() ? building.name : "????"}
          {building.autoBuyAmount > 0 &&
            <div style={{background: 'rgba(1,1,0,0.2)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 100 - percent * 100 + '%'}} />
          }
        </button>

        <h4 className="m0 p1 regular center col col-1">
          {building.count}
        </h4>


        <h4 className="m0 p1 regular col col-3">
          {building.cost() * this.props.multi}
        </h4>

        <h4 className="m0 p1 regular center col col-3">
          {building.baseIncome}
        </h4>
      </div>
    )
  }
})
