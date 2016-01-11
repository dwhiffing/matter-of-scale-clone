import { reducerCreator } from 'shared/redux/helpers'

export const initialState = {
  granters: [],
  recentlyRequested: []
}

const PrivateAccessReducers = {

  fetchCurrentProfile(state, action) {
    const granters = action.payload.session_profile.access_granters
    return Object.assign({}, state, {granters: state.granters.concat(granters)})
  },

  requestAccess(state, action) {
    return Object.assign({}, state, {recentlyRequested: state.recentlyRequested.concat([action.meta[0]])})
  }

}

export default reducerCreator(PrivateAccessReducers, initialState)
