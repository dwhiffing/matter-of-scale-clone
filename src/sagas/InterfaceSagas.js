import { put, select, take, fork } from 'redux-saga/effects'
import { tryCompleteInstance } from 'actions/InstanceActions'

export const delay = duration => {
  return new Promise(r => setTimeout(() => r(), duration))
}

function* doTickSaga() {
  while (true) {
    take('START_TICKING')

    while (true) {
      yield delay(10)
      yield put({ type: 'DO_TICK' })
      const instances = yield select(state => Object.values(state.instances))
      const completeInstances = instances.filter(i => {
        return i.progress >= 100 && i.autoComplete >= i.autoCompleteDuration()
      })
      if (completeInstances.length > 0) {
        for (let i = 0; i < completeInstances.length; i++) {
          yield put(tryCompleteInstance(completeInstances[i].id))
        }
      }
    }
  }
}

export default function* InterfaceSagas() {
  yield fork(doTickSaga)
}
