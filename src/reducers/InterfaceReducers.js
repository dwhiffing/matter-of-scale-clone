import { reducerCreator } from 'utils/helpers'

const initialState = {
  multi: 1,
  saveSlot: 1,
  tickTimeout: null,
  autobuyTimeout: null
}

const InterfaceReducer = {

  rehydrate(state, action) {
    if (action.key === 'ui') {
      const {multi, saveSlot} = action.payload
      return Object.assign({multi, saveSlot}, state)
    }
    return state
  },

  toggleMultiplier(state, action) {
    return Object.assign({}, state, {multi: state.multi < 100 ? state.multi * 10 : 1})
  },

  startTicking(state, action) {
    const {tickTimeout, autobuyTimeout} = action.payload
    return Object.assign({}, state, {tickTimeout, autobuyTimeout})
  },

  clearSave(state, action) {
    localStorage.removeItem('reduxPersist:buildings')
    localStorage.removeItem('reduxPersist:instances')
    localStorage.removeItem('reduxPersist:properties')
    localStorage.removeItem('reduxPersist:ui')
    window.location.reload()
    return state
  }

}

export default reducerCreator(InterfaceReducer, initialState)
