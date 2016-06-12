export const tryBuildingPurchase = (buildingKey, instanceKey, cost) => ({
  type: 'TRY_BUILDING_PURCHASE',
  payload: {
    buildingKey: buildingKey,
    instanceKey: instanceKey,
    cost: cost,
  },
})

export const doBuildingPurchase = (buildingKey, instanceKey, cost, count) => ({
  type: 'DO_BUILDING_PURCHASE',
  payload: {
    buildingKey,
    instanceKey,
    cost: cost,
    count: count,
  },
})


export const updateBuilding = (id, update) => ({
  type: 'UPDATE_BUILDING',
  payload: {
    buildingKey: id,
    update: update,
  },
})

export const upgradePurchase = (instanceKey, buildingKey, cost) => ({
  type: 'UPGRADE_PURCHASE',
  payload: {
    instanceKey: instanceKey,
    buildingKey: buildingKey,
    cost: cost,
  },
})
