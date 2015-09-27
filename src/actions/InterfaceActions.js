import { actionCreatorFactory } from 'utils/reduxHelpers'

/**
* InterfaceActions
* contains async actions for dispatching to multiple reducers based on meta logic
* 
*/

export function startTicking() {
  return (dispatch, getState) => {
    const { timerId } = getState().ui

    // set an interval at 'tickrate' to dispatch DO_TICK to the store
    if (timerId === null) {
      const timerId = setInterval(() => dispatch({type: 'DO_TICK'}), 1000)
      dispatch({type: 'START_TICKING', payload: timerId})
    }
  }
}

export function stopTicking() {
  return (dispatch, getState) => {
    const { timerId } = getState().ui
    
    // clear the interval
    if (timerId !== null) {
      clearInterval(timerId)
      dispatch({type: 'STOP_TICKING', payload: timerId})
    }
  }
}

export function buyBuilding([instanceKey, buildingKey]) {
  return (dispatch, getState) => {
    const instance = getState().instances[instanceKey]
    const building = getState().buildings[instanceKey][buildingKey]
    let cost = building.cost()

    if (cost <= instance.money) {
      dispatch({type: 'ADD_BUILDING', payload: {instanceKey, buildingKey}})
      dispatch({type: 'DEDUCT_CURRENCY', payload: {instanceKey, cost}})
    } else {
      dispatch({type: 'FAILED_PURCHASE', payload: `${building.upgrades+1 - instance.upgradePoints} short`})
    }
  }
}

export function buyUpgrade([instanceKey, buildingKey]) {
  return (dispatch, getState) => {
    const instance = getState().instances[instanceKey]
    const building = getState().buildings[instanceKey][buildingKey]
    let cost = building.upgrades+1

    if (building.upgrades+1 <= instance.upgradePoints && building.count > 0) {
      dispatch({type: 'UPGRADE_BUILDING', payload: {instanceKey, buildingKey}})
      dispatch({type: 'DEDUCT_UPGRADE_CURRENCY', payload: {instanceKey, cost}})
    } else {
      dispatch({type: 'FAILED_PURCHASE', payload: `${building.upgrades+1 - instance.upgradePoints} short`})
    }
  }
}