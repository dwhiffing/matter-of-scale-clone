import { reducerCreator } from 'utils/helpers'

const initialState = {
  multi: 1,
  saveSlot: 1,
  upgrades: 0,
  tickTimeout: null,
  autobuyTimeout: null
}

const InterfaceReducer = {

  rehydrate(state, action) {
    if (action.key === 'ui') {
      const {multi, saveSlot, upgrades} = action.payload
      return Object.assign({}, state, {multi, saveSlot, upgrades})
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

  changeUpgradePoints(state, action) {
    const num = state.upgrades + action.payload
    return Object.assign({}, state, {upgrades: Math.round(num*100) / 100})
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
