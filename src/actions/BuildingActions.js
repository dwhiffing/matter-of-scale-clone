export const updateBuilding = (id, update) => ({
  type: 'UPDATE_BUILDING',
  payload: {
    buildingKey: id,
    update: update,
  },
})

export const buyBuilding = (buildingKey, instanceKey, cost, count) => ({
  type: 'BUY_BUILDING',
  payload: {
    buildingKey,
    instanceKey,
    cost: cost,
    count: count,
  },
})

export const buildingPurchase = (buildingKey, instanceKey, cost) => ({
  type: 'BUILDING_PURCHASE',
  payload: {
    buildingKey: buildingKey,
    instanceKey: instanceKey,
    cost: cost,
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
