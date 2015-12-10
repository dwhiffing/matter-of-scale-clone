import { actionCreatorFactory } from 'utils/reduxHelpers'

export function startTicking() {
  return (dispatch, getState) => {
    const { timerId } = getState().ui

    // set an interval at 'tickrate' to dispatch DO_TICK to the store
    if (timerId === null) {
      const timerId = setInterval(() => dispatch({type: 'DO_TICK'}), 500)
      dispatch({type: 'START_TICKING', payload: timerId})
    }
  }
}

export function stopTicking() {
  return (dispatch, getState) => {
    const { timerId } = getState().ui

    // clear the interval
    if (timerId !== null) {
      clearInterval(timerId)
      dispatch({type: 'STOP_TICKING', payload: timerId})
    }
  }
}
