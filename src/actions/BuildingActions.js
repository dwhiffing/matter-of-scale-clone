import { actionCreatorFactory } from 'utils/reduxHelpers'

export function buyBuilding([instanceKey, buildingKey]) {
  return (dispatch, getState) => {
    const instance = getState().instances[instanceKey]
    const building = getState().buildings[buildingKey]
    let cost = building.cost()

    if (cost <= instance.money) {
      dispatch({type: 'UPDATE_BUILDING', payload: {buildingKey, update: {count: c => c + 1}}})
      dispatch({type: 'UPDATE_INSTANCE', payload: {instanceKey, update: {money: m => m - cost}}})
    } else {
      dispatch({type: 'FLASH_MESSAGE', payload: `PURCHASE_ERROR: ${cost - instance.money} short`})
    }
  }
}

export function buyUpgrade([propertyKey, buildingKey, cost]) {
  return (dispatch, getState) => {
    const property = getState().properties[propertyKey]
    const building = getState().buildings[buildingKey]

    if (property.upgrades >= cost && building.count > 0) {
      dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey, update: {upgrades: u => u - cost, upgradedBuildings: {[building.index]: t => t + 1}}}})
    } else {
      dispatch({type: 'FLASH_MESSAGE', payload: `PURCHASE_ERROR: ${building.upgrades()+1 - property.upgrades} short`})
    }
  }
}
