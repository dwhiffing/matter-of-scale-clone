import { updateInstance } from 'actions/InstanceActions'
import { flashMessage } from 'actions/InterfaceActions'
import { add, sub } from 'utils/helpers'

export const updateBuilding = (id, update) => ({
  type: 'UPDATE_BUILDING',
  payload: {
    buildingKey: id,
    update: update
  }
})

export const buyBuilding = (buildingKey, instanceKey, cost) => ({
  type: 'BUY_BUILDING',
  payload: {
    buildingKey,
    instanceKey,
    cost: cost
  }
})

export function attemptBuildingPurchase([instanceKey, buildingKey, cost]) {
  return (dispatch, getState) => {
    const money = getState().instances[instanceKey].money
    if (cost <= money) {
      dispatch(buyBuilding(buildingKey, instanceKey, cost))
    } else {
      dispatch(flashMessage(`PURCHASE_ERROR: ${cost - money} money short`))
    }
  }
}

export function buyUpgrade([propertyKey, buildingKey, cost]) {
  return (dispatch, getState) => {
    const upgrades = getState().properties[propertyKey].upgrades
    const { count, index } = getState().buildings[buildingKey]

    if (upgrades >= cost && count > 0) {
      dispatch(updateProperty(propertyKey, {
        upgrades: sub(cost),
        upgradedBuildings: {[index]: add(1)}
      }))
    } else {
      dispatch(flashMessage(`PURCHASE_ERROR: ${cost - upgrades} upgrade points short`))
    }
  }
}
