import { createMissingInstances } from 'actions/InstanceActions'
import { flashMessage } from 'actions/InterfaceActions'
import { updateProperty } from 'actions/PropertyActions'
import { sub, add } from 'utils/helpers'
import { put, take, select, fork } from 'redux-saga/effects'

function* unlockBuildingSaga() {
  while (true) {
    const action = yield take('UNLOCK_BUILDING')

    const { id, index } = action.payload
    yield put(updateProperty(id, {
      unlockedBuildings: u => u.concat([index]),
    }))
  }
}

function* buyResearchSaga() {
  while (true) {
    const action = yield take('BUY_RESEARCH')

    const { propertyKey, researchKey, cost } = action.payload
    const property = yield select(state => state.properties[propertyKey])
    const research = property.researchTypes[researchKey]

    if (research.current >= research.max || research.current <= research.min) {
      yield put(flashMessage(
        'PURCHASE_ERROR: research type maxed'
      ))
    } else if (cost > property.researchMoney) {
      yield put(flashMessage(
        `PURCHASE_ERROR: ${cost - property.researchMoney} research short`
      ))
    } else {
      yield put(updateProperty(propertyKey, {
        researchMoney: sub(cost),
        researchTypes: { [researchKey]: {
          current: +(research.current+research.increment).toPrecision(3),
          rank: add(1),
        } },
      }))

      if (researchKey === 'extra') {
        yield put(createMissingInstances())
      }

      if (researchKey === 'incrementCost') {
        yield put(updateProperty(propertyKey,{
          toCompleteUntilNextInstance: property.researchTypes['incrementCost'].current,
        }))
      }
    }
  }
}

export default function* PropertySagas() {
  yield fork(unlockBuildingSaga)
  yield fork(buyResearchSaga)
}
