import { updateProperty } from 'actions/PropertyActions'
import { add, sub } from 'utils/helpers'

export const createInstance = (type, count=1) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CREATE_INSTANCE',
      payload: {
        id: Object.keys(getState().instances).length,
        type: type,
        count: count
      }
    })
  }
}

export const updateInstance = (id, update) => ({
  type: 'UPDATE_INSTANCE',
  payload: {
    instanceKey: id,
    update: update
  }
})

export const completeInstance = (id, type) => ({
  type: 'COMPLETE_INSTANCE',
  payload: {
    id: id,
    type: type
  }
})

// TODO: the completion/creation logic should be handled within the reducer when
// create/complete Instance is dispatched this is complicated by the fact that
// the extra hamlet research needs hamlets to be created after its purchased
export function markInstanceComplete(instanceKey) {
  return (dispatch, getState) => {
    const type = getState().instances[instanceKey].type

    dispatch(completeInstance(instanceKey, type))
    dispatch(createMissingInstances(type+1))

    if (type == 0) {
      dispatch(createMissingInstances(0))
    }
  }
}

export function createMissingInstances(key) {
  return (dispatch, getState) => {
    const prop = getState().properties[key]
    const count = prop.getInstances().length
    const missing = key == 0 ? prop.research("extra") - count : prop.toBuild

    if (missing > 0) {
      dispatch(createInstance(key, missing))
    }
  }
}

export function triggerInstance(instanceKey) {
  return (dispatch, getState) => {
    const instance = getState().instances[instanceKey]
    const income = instance.property().research("activeIncome")
    dispatch(updateInstance(instanceKey, {
      money: add(income)
    }))
  }
}

export const InstanceThunks = {
  createInstance,
  markInstanceComplete,
  triggerInstance
}
