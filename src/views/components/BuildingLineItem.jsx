import React from "react"
import cx from "classnames"

export default (props) => {
  if (!props.building) return false

  const { index, type, building, instance, upgrades, multi } = props

  const cost = building.cost()
  const income = building.income()
  const upgradeLevel = building.upgrades()
  const upgradeCost = building.upgradeCost()
  const singleIncome = building.incomeForSingle()
  const percent = Math.max(-100, 100 - building.autoBuyPercent())

  const buildingId = instance.id*10 + index
  const clickBuy = () => props.doBuildingPurchase(buildingId, instance.id, cost)
  const clickUpgrade = () => props.doUpgradePurchase(instance.id, index, upgradeCost)

  const upgradeMuliplier = (
    <small>({building.baseIncome}x{upgradeLevel})</small>
  )

  const canAffordUpgrade = upgradeCost <= upgrades || building.count == 0
  const canAffordBuy = cost * multi <= instance.money

  if (!building.unlocked() && canAffordBuy) {
    setTimeout(() => props.unlockBuilding(type, index), 0)
  }

  return (
    <tr>
      <td>
        <div className="btn-group">

          {building.count > 0 &&
            <button
              onClick={clickUpgrade}
              className={cx('btn btn-default btn-sm',{
                "btn-danger": !canAffordUpgrade
              })}>

              {upgradeCost}U

            </button>
          }

          <button
            onClick={clickBuy}
            className={cx('relative btn btn-default btn-sm',{
              "btn-danger": !canAffordBuy
            })}>

            {building.unlocked() ? building.name : "????"}

            <div className="bg-progress-bar" style={{right: `${percent}%`}} />

          </button>

        </div>
      </td>

      <td>{building.count}</td>

      <td>{cost * multi}</td>

      <td>{singleIncome} {upgradeLevel > 1 && upgradeMuliplier}</td>

      <td>{income}</td>
    </tr>
  )
}
