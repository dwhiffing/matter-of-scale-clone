import { createMissingInstances } from 'actions/InstanceActions'
import { flashMessage } from 'actions/InterfaceActions'
import { sub, add } from 'utils/helpers'

export const updateProperty = (id, update) => ({
  type: 'UPDATE_PROPERTY',
  payload: {
    propertyKey: id,
    update: update,
  },
})

export const unlockBuilding = (id, index) => {
  return (dispatch) => {
    dispatch(updateProperty(id, {
      unlockedBuildings: u => u.concat([index]),
    }))
  }
}

export function buyResearch(propertyKey, researchKey, cost) {
  return (dispatch, getState) => {
    const property = getState().properties[propertyKey]
    const research = property.researchTypes[researchKey]

    const money = property.researchMoney
    const maxed = research.current >= research.max || research.current <= research.min

    if (maxed) {
      return dispatch(flashMessage('PURCHASE_ERROR: research type maxed'))
    } else if (cost > money) {
      return dispatch(flashMessage(`PURCHASE_ERROR: ${cost - money} research short`))
    }

    dispatch(updateProperty(propertyKey, {
      researchMoney: sub(cost),
      researchTypes: { [researchKey]: {
        current: +(research.current+research.increment).toPrecision(3),
        rank: add(1),
      } },
    }))

    if (researchKey == 'extra') {
      dispatch(createMissingInstances(0))
    }

    if (researchKey == 'incrementCost') {
      dispatch(updateProperty(propertyKey,{
        toCompleteUntilNextInstance: property.researchTypes['incrementCost'].current,
      }))
    }
  }
}


export const PropertyThunks = {
  unlockBuilding,
  buyResearch,
}
