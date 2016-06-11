export const clearSave = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_SAVE' })
  }
}

export const toggleMuliplier = () => {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MULTIPLIER' })
  }
}

export const changeUpgradePoints = (upgrades) => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_UPGRADE_POINTS', payload: upgrades })
  }
}

export function startTicking() {
  return (dispatch, getState) => {
    const { doTickTimeout, preTickTimeout } = getState().ui

    if (doTickTimeout === null && preTickTimeout === null) {
      const preTickTimeout = setInterval(() => dispatch({ type: 'PRE_TICK' }), 500)
      const doTickTimeout = setInterval(() => dispatch({ type: 'DO_TICK' }), 500)
      dispatch({ type: 'START_TICKING', payload: {
        doTickTimeout: doTickTimeout,
        preTickTimeout: preTickTimeout,
      } })
    }
  }
}

export function stopTicking() {
  return (dispatch, getState) => {
    const { doTickTimeout, preTickTimeout } = getState().ui

    if (doTickTimeout !== null && preTickTimeout !== null) {
      clearInterval(doTickTimeout)
      clearInterval(preTickTimeout)
      dispatch({ type: 'STOP_TICKING', payload: {
        doTickTimeout: doTickTimeout,
        preTickTimeout: preTickTimeout,
      } })
    }
  }
}

export function flashMessage(message) {
  return (dispatch) => {
    dispatch({
      type: 'FLASH_MESSAGE',
      payload: message,
    })
  }
}

export const InterfaceThunks = {
  stopTicking,
  startTicking,
  toggleMuliplier,
  clearSave,
  changeUpgradePoints,
}
