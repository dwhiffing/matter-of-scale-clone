import { actionCreatorFactory } from 'utils/reduxHelpers'

export function completeInstance(instanceKey) {
  return (dispatch, getState) => {
    let instances = getState().instances
    let instance
    let propertyKey
    let properties = Object.keys(getState().properties).map(o => getState().properties[o])
    if (typeof instanceKey != 'undefined') {
      instance = instances[instanceKey]
      propertyKey = instance.type

      dispatch({type: 'UPDATE_INSTANCE', payload: {instanceKey: instanceKey, update: { complete: true, autoComplete: -1,money: 0 }}})
      dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey, update: {next: n => n - 1}}})
      properties = Object.keys(getState().properties).map(o => getState().properties[o])

      if (properties.filter(i => i.next == 0).length > 0) {
        dispatch({type: 'CREATE_INSTANCE', payload: propertyKey+1})
        dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey: propertyKey, update: {next: n => 2+instance.type, research: r => r+1}}})
        dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey: propertyKey+1, update: {unlocked: true}}})
      } else {
        dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey: propertyKey, update: {research: r => r+1}}})
      }
    }

    if ((instanceKey && propertyKey == 0) || !instanceKey) {
      let instances = getState().instances
      let hamlets = Object.keys(instances).map(i => instances[i]).filter(i => i.type == 0 && !i.complete)
      let properties = Object.keys(getState().properties).map(o => getState().properties[o])
      while (hamlets.length < properties[0].researchTypes.extra.current) {
        dispatch({type: 'CREATE_INSTANCE', payload: 0})
        instances = getState().instances
        hamlets = Object.keys(instances).map(i => instances[i]).filter(i => i.type == 0 && !i.complete)
      }
    }
  }
}

export function triggerInstance(instanceKey) {
  return (dispatch, getState) => {
    const instances = getState().instances
    const instance = instances[instanceKey]
    const income = getState().properties[instance.type].researchTypes.activeIncome.current
    dispatch({type: 'UPDATE_INSTANCE', payload: {instanceKey: instanceKey, update: { money: m => m + income }}})
  }
}
