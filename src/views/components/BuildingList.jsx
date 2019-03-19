import React from 'react'

export default function BuildingList({
  ui,
  instance,
  tryUpgradePurchase,
  tryBuildingPurchase,
  _unlockBuilding,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Building</th>
          <th>#</th>
          <th>Cost</th>
          <th>Income</th>
          <th>/ Tick</th>
        </tr>
      </thead>

      <tbody>
        {instance.buildings().map((building, index) => {
          return (
            <BuildingLineItem
              key={`building-${index}`}
              index={index}
              ui={ui}
              building={building}
              instance={instance}
              tryUpgradePurchase={tryUpgradePurchase}
              tryBuildingPurchase={tryBuildingPurchase}
              _unlockBuilding={_unlockBuilding}
            />
          )
        })}
      </tbody>
    </table>
  )
}
