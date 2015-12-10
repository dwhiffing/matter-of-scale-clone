import { completeInstance } from 'actions/InstanceActions'

export function updateProperty(propertyKey, updates) {
  return (dispatch, getState) => {
    dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey, update: updates}})
  }
}

export function buyResearch(propertyKey, researchKey) {
  return (dispatch, getState) => {
    const properties = getState().properties
    const property = properties[propertyKey]
    const research = property.researchTypes[researchKey]
    if (research.current < research.max || research.current > research.min) {
      dispatch({type: 'UPDATE_PROPERTY', payload: {propertyKey, update: {researchTypes:{[researchKey]: {
        current: +(research.current+research.increment).toPrecision(3),
        rank: r => r + 1
      }}}}})
    }
    if (researchKey == 'extra') {
      dispatch(completeInstance())
    }
  }
}
