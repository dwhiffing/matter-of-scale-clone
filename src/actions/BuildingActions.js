import { updateInstance } from 'actions/InstanceActions'
import { flashMessage, changeUpgradePoints } from 'actions/InterfaceActions'
import { add } from 'utils/helpers'

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

export function doBuildingPurchase(buildingKey, instanceKey, cost) {
  return (dispatch, getState) => {
    const { instances, ui } = getState()
    const money = instances[instanceKey].money
    const count = ui.multi
    if (cost * count <= money) {
      dispatch(buyBuilding(buildingKey, instanceKey, cost, count))
    } else {
      dispatch(flashMessage(`PURCHASE_ERROR: ${cost - money} money short`))
    }
  }
}

export function doUpgradePurchase(instanceKey, buildingKey, cost) {
  return (dispatch, getState) => {
    const upgrades = getState().ui.upgrades
    const { count, index } = getState().instances[instanceKey].buildings()[buildingKey]
    if (upgrades >= cost && count > 0) {
      dispatch(updateInstance(instanceKey, {
        upgradedBuildings: { [index]: add(1) },
      }))
      dispatch(changeUpgradePoints(0 - cost))
    } else {
      dispatch(flashMessage(`PURCHASE_ERROR: ${cost - upgrades} upgrade points short`))
    }
  }
}

export const BuildingThunks = {
  doBuildingPurchase,
  doUpgradePurchase,
}
