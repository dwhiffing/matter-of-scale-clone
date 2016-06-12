export const createInstance = (type, count=1) => ({
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

export const updateInstance = (id, update) => ({
  type: 'UPDATE_INSTANCE',
  payload: {
    instanceKey: id,
    update: update,
  },
})

export const markInstanceComplete = (instanceKey) => ({
  type: 'MARK_INSTANCE_COMPLETE',
  payload: instanceKey,
})

export const createMissingInstances = (type) => ({
  type: 'CREATE_MISSING_INSTANCES',
  payload: {
    type,
  },
})

export const completeInstance = (id, type) => ({
  type: 'COMPLETE_INSTANCE',
  payload: {
    id: id,
    type: type,
  },
})

export const toggleAutoBuy = (key) => ({
  type: 'TOGGLE_AUTO_BUY',
  payload: key,
})
