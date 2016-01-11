import ProfileUtils from 'profiles/utils/ProfileUtils'
import { reducerCreator } from 'shared/redux/helpers'

export const initialState = null

const ViewedProfileReducers = {

  fetchViewedProfileRequest: (state, action) => null,

  fetchViewedProfile(state, action) {
    if (action.payload.fromCache) return state
      
    return ProfileUtils.decorateProfile(action.payload.profile)
  }

}

export default reducerCreator(ViewedProfileReducers, initialState)
