export const clearSave = () => ({
  type: 'CLEAR_SAVE',
})

export const toggleMuliplier = () => ({
  type: 'TOGGLE_MULTIPLIER',
})

export const changeUpgradePoints = (upgrades) => ({
  type: 'SET_UPGRADE_POINTS',
  payload: upgrades,
})

export const _flashMessage = (message) => ({
  type: 'FLASH_MESSAGE',
  payload: message,
})
