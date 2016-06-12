import React from 'react'
import cx from 'classnames'

export default (props) => {
  if (!props.building) return false

  const { index, building, instance, ui } = props

  const buildingCost = building.cost()
  const percent = Math.max(-100, 100 - building.autoBuyPercent())

  const buildingId = instance.id*10 + index
  const canAffordUpgrade = building.upgradeCost() <= ui.upgrades || building.count == 0
  const canAffordBuy = buildingCost * ui.multi <= instance.money

  if (!building.unlocked() && canAffordBuy) {
    setTimeout(() => props.unlockBuilding(instance.type, index), 0)
  }

  return (
    <tr>
      <td>
        <div className="btn-group">

          {building.count > 0 &&
            <button
              onClick={() => props.upgradePurchase(instance.id, index, building.upgradeCost())}
              className={cx('btn btn-default btn-sm', {
                'btn-danger': !canAffordUpgrade,
              })}>

              {building.upgradeCost()}U

            </button>
          }

          <button
            onClick={() => props.buildingPurchase(buildingId, instance.id, buildingCost)}
            className={cx('relative btn btn-default btn-sm',{
              'btn-danger': !canAffordBuy,
            })}>

            {building.unlocked() ? building.name : '????'}

            <div className="bg-progress-bar" style={{ right: `${percent}%` }} />

          </button>

        </div>
      </td>

      <td>
        {building.count}
      </td>

      <td>
        {buildingCost * ui.multi}
      </td>

      <td>
        <span>
          {building.incomeForSingle()}
        </span>
        {building.upgrades() > 1 &&
          <span><small>
            ({building.baseIncome}x{building.upgrades()})
          </small></span>
        }
      </td>

      <td>
        {building.income()}
      </td>
    </tr>
  )
}
