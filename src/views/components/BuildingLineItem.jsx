import React from "react"
import cx from "classnames"

export default (props) => {
  if (!props.building) return false

  const { index, type, building, instance } = props

  const canAffordUpgrade = building.upgrades() <= props.availableUpgrades || building.count == 0
  const canAffordBuy = building.cost() * props.multi <= instance.money

  const id = instance.id
  const buildingId = id*10 + index

  const clickBuy = () => props.doBuildingPurchase(buildingId, id, building.cost())
  const clickUpgrade = () => props.doUpgradePurchase(type, index, building.upgrades())

  const percent = Math.max(-100, 100 - (building.autoBuyAmount / (building.research('autoCost') * building.cost())) * 100)
  const progressBarStyle = {
    background: 'rgba(1,1,0,0.2)',
    position: 'absolute',
    top: 0,
    right: `${percent}%`,
    transition: "right 100ms",
    bottom: 0,
    left: 0,
  }

  if (!building.unlocked() && canAffordBuy) {
    setTimeout(() => props.unlockBuilding(type, index), 0)
  }

  return (
    <div
    className={cx("bar-wrap col col-12 right-align", {
      muted: !building.unlocked()
    })}>

      {building.count > 0 &&
        <button
        className={cx(`button py2 white col col-2`, {
          "bg-green": canAffordUpgrade,
          "bg-red": !canAffordUpgrade
        })}
        onClick={clickUpgrade}>
          {building.upgrades()}U x{Math.pow(2, building.upgrades())}
        </button>
      }

      <button
      className={cx("button relative py2 col", {
        "bg-green": canAffordBuy,
        "bg-red": !canAffordBuy,
        "col-3": building.count > 0,
        "col-5": building.count == 0
      })}
      onClick={clickBuy}>
        {building.unlocked() ? building.name : "????"}
        <div style={progressBarStyle} />
      </button>

      <h4 className="m0 p1 regular center col col-1">
        {building.count}
      </h4>

      <h4 className="m0 p1 regular col col-3">
        {building.cost() * props.multi}
      </h4>

      <h4 className="m0 p1 regular center col col-3">
        {building.baseIncome}
      </h4>
    </div>
  )
}
