export const tryCreateInstance = (type, count=1) => ({
  type: 'TRY_CREATE_INSTANCE',
  payload: {
    type: type,
    count: count,
  },
})

export const tryCompleteInstance = (instanceKey) => ({
  type: 'TRY_COMPLETE_INSTANCE',
  payload: instanceKey,
})

export const toggleAutoBuy = (key) => ({
  type: 'TOGGLE_AUTO_BUY',
  payload: key,
})

export const _updateInstance = (instanceKey, update) => ({
  type: 'UPDATE_INSTANCE',
  payload: {
    instanceKey: instanceKey,
    update: update,
  },
})

export const _createMissingInstances = () => ({
  type: 'CREATE_MISSING_INSTANCES',
})

export const _doCreateInstance = (id, type, nth, count=1) => ({
  type: 'DO_CREATE_INSTANCE',
  payload: {
    id: id,
    type: type,
    nth: nth,
    count: count,
  },
})

export const _doCompleteInstance = (instanceKey, propertyKey) => ({
  type: 'DO_COMPLETE_INSTANCE',
  payload: {
    instanceKey: instanceKey,
    propertyKey: propertyKey,
  },
})
