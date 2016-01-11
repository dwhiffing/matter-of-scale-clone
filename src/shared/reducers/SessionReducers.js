import { reducerCreator } from 'shared/redux/helpers'

export const initialState = {
  token: null
}

const SessionReducers = {
  setToken(state, action) {
    return Object.assign({}, state, {token: action.payload})
  }
}

export default reducerCreator(SessionReducers, initialState)