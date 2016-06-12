import { doCreateInstance, updateInstance, createMissingInstances, completeInstance, createInstance } from '../actions/InstanceActions'
import { put, take, select, fork } from 'redux-saga/effects'

// TODO: the completion/creation logic should be handled within the reducer when
// create/complete Instance is dispatched this is complicated by the fact that
// the extra hamlet research needs hamlets to be created after its purchased
function* completeInstanceSaga() {
  while (true) {
    const action = yield take('MARK_INSTANCE_COMPLETE')
    const type = yield select(state => state.instances[action.payload].type)

    yield put(completeInstance(action.payload, type))
    yield put(createMissingInstances(type+1))

    if (type == 0) {
      yield put(createMissingInstances(0))
    }
  }
}

function* createMissingInstancesSaga() {
  while (true) {

    const numInstances = yield select(state => Object.keys(state.instances).length)
    if (numInstances === 0) {
      yield put(createInstance(0))
    }

    const action = yield take('CREATE_MISSING_INSTANCES')

    const { type } = action.payload
    const prop = yield select(state => state.properties[type])
    const count = prop.getInstances().length
    const missing = type == 0 ? prop.research('extra') - count : prop.toBuild
    const { id, nth } = yield select(state => {
      const property = state.properties[type]
      const instances = Object.values(state.instances)
      return {
        id: instances.length,
        nth: instances.filter(obj => obj.type == property.id).length + 1,
      }
    })

    if (missing > 0) {
      yield put(doCreateInstance(id, type, nth, missing))
    }
  }
}

function* toggleAutoBuySaga() {
  while (true) {
    const action = yield take('TOGGLE_AUTO_BUY')

    const { key } = action
    yield put(updateInstance(key, {
      disableAutoBuy: autoBuy => !autoBuy,
    }))
  }
}

function* createInstanceSaga() {
  while (true) {
    const action = yield take('TRY_CREATE_INSTANCE')

    const { type } = action.payload
    const { id, nth } = yield select(state => {
      const property = state.properties[type]
      const instances = Object.values(state.instances)
      return {
        id: instances.length,
        nth: instances.filter(obj => obj.type == property.id).length + 1,
      }
    })
    yield put(doCreateInstance(id, type, nth))
  }
}

export default function* InstanceSagas() {
  yield fork(completeInstanceSaga)
  yield fork(createMissingInstancesSaga)
  yield fork(createInstanceSaga)
  yield fork(toggleAutoBuySaga)
}
