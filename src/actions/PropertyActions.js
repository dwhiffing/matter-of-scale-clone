export const updateProperty = (propertyKey, update) => ({
  type: 'UPDATE_PROPERTY',
  payload: {
    propertyKey: propertyKey,
    update: update,
  },
})

export const unlockBuilding = (id, index) => ({
  type: 'UNLOCK_BUILDING',
  payload: {
    id: id,
    index: index,
  },
})

export const buyResearch = (propertyKey, researchKey, cost) => ({
  type: 'BUY_RESEARCH',
  payload: {
    propertyKey: propertyKey,
    researchKey: researchKey,
    cost: cost,
  },
})
