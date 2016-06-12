import { updateInstance } from '../actions/InstanceActions'
import { buyBuilding } from '../actions/BuildingActions'
import { flashMessage, changeUpgradePoints } from '../actions/InterfaceActions'
import { add } from 'utils/helpers'
import { put, select, fork, take } from 'redux-saga/effects'

function* buildingPurchase() {
  while (true) {
    const action = yield take('BUILDING_PURCHASE')

    const { buildingKey, instanceKey, cost } = action.payload
    const state = yield select(state => state)
    const { instances, ui } = state

    const money = instances[instanceKey].money
    const count = ui.multi
    if (cost * count <= money) {
      yield put(buyBuilding(buildingKey, instanceKey, cost, count))
    } else {
      yield put(flashMessage(`PURCHASE_ERROR: ${cost - money} money short`))
    }
  }
}

function* upgradePurchase() {
  while (true) {
    const action = yield take('UPGRADE_PURCHASE')

    const { instanceKey, buildingKey, cost } = action.payload
    const upgrades = yield select(state => state.ui.upgrads)
    const { count, index } = yield select(state => state.instances[instanceKey].buildings()[buildingKey])
    if (upgrades >= cost && count > 0) {
      yield put(updateInstance(instanceKey, {
        upgradedBuildings: { [index]: add(1) },
      }))
      yield put(changeUpgradePoints(0 - cost))
    } else {
      yield put(flashMessage(`PURCHASE_ERROR: ${cost - upgrades} upgrade points short`))
    }
  }
}

export default function* BuildingSagas() {
  yield fork(buildingPurchase)
  yield fork(upgradePurchase)
}
