import { reducerCreator } from 'utils/reduxHelpers'
import u from 'updeep'

const initialState = {
  multi: 1,
  timerId: null
}

const InterfaceReducer = {

  toggleMultiplier(state, action) {
    return u({
      multi: state.multi < 100 ? state.multi * 10 : 1
    }, state)
  },

  startTicking(state, action) {
    return u({
      timerId: action.payload.timerId
    }, state)
  },

  clearSave(state, action) {
    localStorage.removeItem('save')
    console.log("save cleared")
    return state
  }

}

export default reducerCreator(InterfaceReducer, initialState)