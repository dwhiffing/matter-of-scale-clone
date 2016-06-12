export const clearSave = () => ({
  type: 'CLEAR_SAVE',
})

export const stopTicking = () => ({
  type: 'STOP_TICKING',
})

export const startTicking = () => ({
  type: 'START_TICKING',
})

export const toggleMuliplier = () => ({
  type: 'TOGGLE_MULTIPLIER',
})

export const flashMessage = (message) => ({
  type: 'FLASH_MESSAGE',
  payload: message,
})

export const changeUpgradePoints = (upgrades) => ({
  type: 'SET_UPGRADE_POINTS',
  payload: upgrades,
})
