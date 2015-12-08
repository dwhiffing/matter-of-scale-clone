import { reducerCreator } from 'utils/reduxHelpers'

const initialState = {
  multi: 1,
  timerId: null
}

const InterfaceReducer = {

  toggleMultiplier(state, action) {
    return Object.assign({}, state, {multi: state.multi < 100 ? state.multi * 10 : 1})
  },

  startTicking(state, action) {
    return Object.assign({}, state, {timerId: action.payload.timerId})
  },

  clearSave(state, action) {
    localStorage.removeItem('save')
    console.log("save cleared")
    return state
  }

}

export default reducerCreator(InterfaceReducer, initialState)
