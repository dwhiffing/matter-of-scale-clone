import u from 'updeep'

const initialState = {
  multi: 1,
  saveSlot: 1,
  upgrades: 0,
  doTickTimeout: null,
  preTickTimeout: null,
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {

    case 'persist/REHYDRATE': {
      return payload.ui ? u(payload.ui, state) : state
    }

    case 'TOGGLE_MULTIPLIER':
      return u({
        multi: state.multi < 100 ? state.multi * 10 : 1,
      }, state)

    case 'SET_TICK_TIMEOUT':
      return u({
        doTickTimeout: payload.doTickTimeout,
      }, state)

    case 'SET_UPGRADE_POINTS': {
      return u({
        upgrades: Math.round((state.upgrades + payload) * 100) / 100,
      }, state)
    }

    case 'CLEAR_SAVE': {
      localStorage.removeItem('reduxPersist:buildings')
      localStorage.removeItem('reduxPersist:instances')
      localStorage.removeItem('reduxPersist:properties')
      localStorage.removeItem('reduxPersist:ui')
      window.location.reload()
      return state
    }

    default:
      return state
  }
}
