import { reducerCreator } from 'utils/helpers'

const initialState = {
  multi: 1,
  tickTimeout: null,
  autobuyTimeout: null
}

const InterfaceReducer = {

  toggleMultiplier(state, action) {
    return Object.assign({}, state, {multi: state.multi < 100 ? state.multi * 10 : 1})
  },

  startTicking(state, action) {
    const {tickTimeout, autobuyTimeout} = action.payload
    return Object.assign({}, state, {tickTimeout, autobuyTimeout})
  },

  clearSave(state, action) {
    localStorage.removeItem('save')
    console.log("save cleared")
    return state
  }

}

export default reducerCreator(InterfaceReducer, initialState)
