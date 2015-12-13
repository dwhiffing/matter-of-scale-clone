export const clearSave = () => {
  return (dispatch) => {
    dispatch({type: "CLEAR_SAVE"})
  }
}
export const toggleMuliplier = () => {
  return (dispatch) => {
    dispatch({type: "TOGGLE_MULTIPLIER"})
  }
}

export function startTicking() {
  return (dispatch, getState) => {
    const { tickTimeout, autobuyTimeout } = getState().ui

    if (tickTimeout === null && autobuyTimeout === null) {
      const autobuyTimeout = setInterval(() => dispatch({type: 'DO_AUTOBUY'}), 500)
      const tickTimeout = setInterval(() => dispatch({type: 'DO_TICK'}), 500)
      dispatch({type: 'START_TICKING', payload: {tickTimeout, autobuyTimeout}})
    }
  }
}

export function stopTicking() {
  return (dispatch, getState) => {
    const { tickTimeout, autobuyTimeout } = getState().ui

    if (tickTimeout !== null && autobuyTimeout !== null) {
      clearInterval(tickTimeout)
      clearInterval(autobuyTimeout)
      dispatch({type: 'STOP_TICKING', payload: {tickTimeout, autobuyTimeout}})
    }
  }
}

export function flashMessage(message) {
  return (dispatch, getState) => {
    dispatch({
      type: 'FLASH_MESSAGE',
      payload: message
    })
  }
}

export const InterfaceThunks = {
  stopTicking,
  startTicking,
  toggleMuliplier,
  clearSave
}
