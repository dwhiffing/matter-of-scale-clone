import {reducerCreator} from 'shared/redux/helpers'

export const initialState = []

const BlockReducers = {

  fetchCurrentProfileRequest(state, action) {
    return initialState
  },

  fetchCurrentProfile(state, action) {
    return state.concat(action.payload.session_profile.blocks)
  },

  addBlock(state, action) {
    return state.concat([action.payload.profile])
  },

  removeBlock(state, action) {
    return state.filter(block => block.id != action.meta[0])
  }

}

export default reducerCreator(BlockReducers, initialState)
