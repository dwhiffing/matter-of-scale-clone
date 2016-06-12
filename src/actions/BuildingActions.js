export const tryBuildingPurchase = (buildingKey, instanceKey, cost) => ({
  type: 'TRY_BUILDING_PURCHASE',
  payload: {
    buildingKey: buildingKey,
    instanceKey: instanceKey,
    cost: cost,
  },
})

export const tryUpgradePurchase = (instanceKey, buildingKey, cost) => ({
  type: 'TRY_UPGRADE_PURCHASE',
  payload: {
    instanceKey: instanceKey,
    buildingKey: buildingKey,
    cost: cost,
  },
})

export const _doBuildingPurchase = (buildingKey, instanceKey, cost, count) => ({
  type: 'DO_BUILDING_PURCHASE',
  payload: {
    buildingKey,
    instanceKey,
    cost: cost,
    count: count,
  },
})

export const _updateBuilding = (id, update) => ({
  type: 'UPDATE_BUILDING',
  payload: {
    buildingKey: id,
    update: update,
  },
})
