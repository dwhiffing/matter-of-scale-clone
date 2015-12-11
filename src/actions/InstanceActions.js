import { updateProperty } from 'actions/PropertyActions'
import { add, sub } from 'utils/helpers'

export const createInstance = (id, count=1) => ({
  type: 'CREATE_INSTANCE',
  payload: {
    type: id,
    count: count
  }
})

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

export function markInstanceComplete(instanceKey) {
  return (dispatch, getState) => {
    let instance = getState().instances[instanceKey]

    dispatch(completeInstance(instanceKey, instance.type))
    // should correct this to a single call (hamlets fail to create when finishing without this line)
    dispatch(createMissingInstances(instance.type))
    // this one is fine
    dispatch(createMissingInstances(instance.type+1))
  }
}

export function createMissingInstances(propertyKey) {
  return (dispatch, getState) => {
    const prop = getState().properties[propertyKey]
    const instances = Object.values(getState().instances)

    const amountNeeded = propertyKey == 0 ? prop.researchTypes.extra.current : prop.toBuild + prop.instances().length
    const incomplete = i => i.type == propertyKey && !i.complete
    const amountToBuild = amountNeeded - instances.filter(incomplete).length

    dispatch(createInstance(propertyKey, amountToBuild))
  }
}

export function triggerInstance(instanceKey) {
  return (dispatch, getState) => {
    const income = getState().instances[instanceKey].property().researchTypes.activeIncome.current
    dispatch(updateInstance(instanceKey, {
      money: add(income)
    }))
  }
}
