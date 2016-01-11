import { reducerCreator } from 'shared/redux/helpers'

export const initialState = []

const FavoriteReducers = {

  fetchCurrentProfileRequest(state, action) {
    return initialState
  },

  fetchCurrentProfile(state, action) {
    return state.concat(action.payload.session_profile.favorites)
  },

  addFavorite(state, action) {
    return state.concat([action.payload.profile])
  },

  removeFavorite(state, action) {
    return state.filter(favorite => favorite.id != action.meta[0])
  }

}

export default reducerCreator(FavoriteReducers, initialState)
