export const updateProperty = (id, update) => ({
  type: 'UPDATE_PROPERTY',
  payload: {
    propertyKey: id,
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
