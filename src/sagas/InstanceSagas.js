import { put, take, select, fork, call } from 'redux-saga/effects'
import {
  doCreateInstance,
  updateInstance,
  createMissingInstances,
  doCompleteInstance,
  tryCreateInstance,
} from 'actions/InstanceActions'


function* _createInstance(type, count) {
  if (count <= 0) {
    return false
  }
  const { id, nth } = yield select(state => {
    const property = state.properties[type]
    const instances = Object.values(state.instances)
    return {
      id: instances.length,
      nth: instances.filter(obj => obj.type == property.id).length + 1,
    }
  })
  yield put(doCreateInstance(id, type, nth, count))
}


function* tryCompleteInstanceSaga() {
  while (true) {
    const action = yield take('TRY_COMPLETE_INSTANCE')

    const instanceKey = action.payload
    const propertyKey = yield select(state => state.instances[action.payload].type)

    yield put(doCompleteInstance(instanceKey, propertyKey))
    yield put(createMissingInstances())
  }
}

function* tryCreateInstanceSaga() {
  while (true) {
    const action = yield take('TRY_CREATE_INSTANCE')

    const { type } = action.payload
    yield call(_createInstance, type)
  }
}

function* createMissingInstancesSaga() {
  while (true) {

    const numInstances = yield select(state => Object.keys(state.instances).length)
    if (numInstances === 0) {
      yield put(tryCreateInstance(0))
    }

    yield take('CREATE_MISSING_INSTANCES')

    const properties = yield select(state => Object.values(state.properties))
    for (let type = 0; type < properties.length; type++) {
      const property = properties[type]
      const numActive = property.getInstances().length
      const numMissing = type === 0 ?
        property.research('extra') - numActive :
        property.toBuild

      yield call(_createInstance, type, numMissing)
    }
  }
}

function* toggleAutoBuySaga() {
  while (true) {
    const action = yield take('TOGGLE_AUTO_BUY')

    yield put(updateInstance(action.payload.key, {
      disableAutoBuy: autoBuy => !autoBuy,
    }))
  }
}

export default function* InstanceSagas() {
  yield fork(tryCompleteInstanceSaga)
  yield fork(createMissingInstancesSaga)
  yield fork(tryCreateInstanceSaga)
  yield fork(toggleAutoBuySaga)
}
