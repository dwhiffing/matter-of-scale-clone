import React from "react"
import { buyBuilding, buyUpgrade } from "actions/InterfaceActions"
import _ from "numeral"

export default React.createClass({
  render() {
    if (!this.props.buildings) return false    
    let {buildings, index, multi, upgradePoints, paramInstance, money, dispatch} = this.props
    return (
      <div className="clearfix">
        {buildings.map((building, i) => {
          let buttonClass = building.cost()*multi > money ? "bg-red" : "bg-green"
          let upgradeClass = building.upgrades+1 > upgradePoints || building.count == 0 ? "bg-red" : "bg-green"
          let upgradeNext = Math.pow(2, building.upgrades+1)

          return (
            <div key={`building-${building.index}`} className={`bar-wrap col col-12 right-align ${building.unlocked ? "" : "muted"}`}>
              {building.count > 0 &&
                <button className={`regular rounded h5 white col col-1 ${upgradeClass}`}
                  onClick={() => dispatch(buyUpgrade([index, i]))}>

                  {building.upgrades+1}U x{upgradeNext}

                </button>
              }

              <button type="button" className={`button py2 col col-4 ${buttonClass} ${building.count > 0 ? 'col' : 'col-5'}`}
                onClick={() => dispatch(buyBuilding([paramInstance, building.index]))}>
                
                {building.unlocked ? building.name : "????"}
              </button>

              <h4 className="regular center m0 p1 col col-1">
                {building.count}
              </h4>

              <h4 className="regular m0 p1 col col-2">
                {building.cost() * multi}
              </h4>

              <h4 className="regular center m0 p1 col col-2">
                {building.income * building.upgrades}
              </h4>

              <h4 className="regular m0 p1 col col-2">
                {building.income * building.count * building.upgrades}
              </h4>
            </div>
          )
        })}
      </div>
    )
  }
})
