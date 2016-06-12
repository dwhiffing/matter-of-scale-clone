export const tryCreateInstance = (type, count=1) => ({
  type: 'TRY_CREATE_INSTANCE',
  payload: {
    type: type,
    count: count,
  },
})

export const doCreateInstance = (id, type, nth, count=1) => ({
  type: 'DO_CREATE_INSTANCE',
  payload: {
    id: id,
    type: type,
    nth: nth,
    count: count,
  },
})

export const tryCompleteInstance = (instanceKey) => ({
  type: 'TRY_COMPLETE_INSTANCE',
  payload: instanceKey,
})

export const doCompleteInstance = (instanceKey, propertyKey) => ({
  type: 'DO_COMPLETE_INSTANCE',
  payload: {
    instanceKey: instanceKey,
    propertyKey: propertyKey,
  },
})

export const updateInstance = (instanceKey, update) => ({
  type: 'UPDATE_INSTANCE',
  payload: {
    instanceKey: instanceKey,
    update: update,
  },
})

export const createMissingInstances = () => ({
  type: 'CREATE_MISSING_INSTANCES',
})

export const toggleAutoBuy = (key) => ({
  type: 'TOGGLE_AUTO_BUY',
  payload: key,
})
