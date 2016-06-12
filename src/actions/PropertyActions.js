export const tryBuyResearch = (propertyKey, researchKey, cost) => ({
  type: 'TRY_BUY_RESEARCH',
  payload: {
    propertyKey: propertyKey,
    researchKey: researchKey,
    cost: cost,
  },
})

export const _updateProperty = (propertyKey, update) => ({
  type: 'UPDATE_PROPERTY',
  payload: {
    propertyKey: propertyKey,
    update: update,
  },
})

export const _unlockBuilding = (id, index) => ({
  type: 'UNLOCK_BUILDING',
  payload: {
    id: id,
    index: index,
  },
})
