import { createMissingInstances } from 'actions/InstanceActions'

export const updateProperty = (id, update) => ({
  type: 'UPDATE_PROPERTY',
  payload: {
    propertyKey: id,
    update: update
  }
})

export const unlockBuilding = (id, index) => {
  return (dispatch, getState) => {
    dispatch(updateProperty(id, {
      unlockedBuildings: u => u.concat([index])
    }))
  }
}

export function buyResearch(propertyKey, researchKey) {
  return (dispatch, getState) => {
    const property = getState().properties[propertyKey]
    const research = property.researchTypes[researchKey]

    // TODO: needs to deduct currency and only purchase if sufficient funds

    // ensure that the research isn't maxed out
    if (research.current < research.max || research.current > research.min) {
      dispatch(updateProperty(propertyKey, {
        researchTypes: { [researchKey]: {
          current: +(research.current+research.increment).toPrecision(3),
          rank: r => r + 1
        }}
      }))
    }

    if (researchKey == 'extra') {
      dispatch(createMissingInstances(0))
    }

    if (researchKey == 'incrementCost') {
      dispatch(updateProperty(propertyKey,{
        toCompleteUntilNextInstance: property.research('incrementCost')
      }))
    }
  }
}


export const PropertyThunks = {
  unlockBuilding,
  buyResearch
}
