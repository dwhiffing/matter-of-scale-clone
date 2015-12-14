import React from "react"
import cx from "classnames"

export default (props) => {
  if (!props.building) return false

  const { index, type, building, instance } = props

  const canAffordUpgrade = building.upgradeCost() <= props.upgrades || building.count == 0
  const canAffordBuy = building.cost() * props.multi <= instance.money

  const id = instance.id
  const buildingId = id*10 + index

  const clickBuy = () => props.doBuildingPurchase(buildingId, id, building.cost())
  const clickUpgrade = () => props.doUpgradePurchase(building.instanceId, index, building.upgradeCost())

  const percent = Math.max(-100, 100 - building.autoBuyPercent())
  const progressBarStyle = {
    background: 'rgba(1,1,0,0.1)',
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
  // should be muted if not unlocked
  return (
    <tr>

      <td>
        <div className="btn-group">
        {building.count > 0 &&
          <button type=""
          className={cx('btn btn-default btn-sm',{
            "btn-danger": !canAffordUpgrade
          })}
          onClick={clickUpgrade}>
            {building.upgradeCost()}U
          </button>
        }
        <button
        style={{position: 'relative'}}
        className={cx('btn btn-default btn-sm',{
          "btn-danger": !canAffordBuy
        })}
        onClick={clickBuy}>
          {building.unlocked() ? building.name : "????"}
          <div style={progressBarStyle} />
        </button>
        </div>
      </td>

      <td>
        {building.count}
      </td>

      <td>
        {building.cost() * props.multi}
      </td>

      <td>
        {building.incomeForSingle()} {building.upgrades() > 1 && <small>({building.baseIncome}x{building.upgrades()})</small>}
      </td>

      <td>
        {building.income()}
      </td>
    </tr>
  )
}
