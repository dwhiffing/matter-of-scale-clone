import ProfileUtils from 'profiles/utils/ProfileUtils'
import { reducerCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'
import _ from 'lodash'

export const initialState = null

// used to ensure that related photo attrs are kept up to date as user changes photos
// currently handles: public_photo_count, private_photo_count, extension.profile_photo_url
const updatePhotoAttrs = (state, action) => {
  const photos = action.payload.photos
  const defaultPhoto = `/images/medium_profile_default_${state.gender}.png`
  const profile_photo_url = photos[0] && !photos[0].private ? photos[0].medium : defaultPhoto
  const public_photo_count = photos.filter(p => !p.private).length
  const private_photo_count = photos.filter(p => p.private).length

  return Object.assign({}, state, {
    public_photo_count,
    private_photo_count,
    extension: {profile_photo_url}
  })
}

const CurrentProfileReducers = {

  fetchCurrentProfile(state, action) {
    // omit keys that are mapped to other parts of the state
    const profile = _.omit(action.payload.session_profile, ['favorites', 'blocks', 'access_granters'])

    return ProfileUtils.decorateProfile(profile)
  },

  // TODO: These fetch properties from Junto, when brunel returns this in Profiles#Show, this can be removed
  fetchFreeMessages(state, action) {
    let free_messages = action.payload.free_messages || 0
    if (state.subscriber) {
      free_messages = 0
    }
    return Object.assign({}, state, {remainingFreeMessages: free_messages})
  },

  patchCurrentProfile(state, action) {
    let [attr, value] = action.meta
    let model = ProfileUtils.attrToModel[attr]

    if (model === 'profile') {
      return Object.assign({}, state, {[attr]: value})
    } else {
      return Object.assign({}, state, {[model]: {[attr]: value}})
    }
  },

  sendMessage(state, action) {
    if (action.payload.status === "error") {
      return state
    }

    const freeMessages = action.payload.free_messages || 0
    const newState = {remainingFreeMessages: freeMessages}

    return Object.assign({}, state, newState)
  },

  uploadPhoto: updatePhotoAttrs,
  deletePhoto: updatePhotoAttrs,
  updatePhoto: updatePhotoAttrs

}

export default reducerCreator(CurrentProfileReducers, initialState)
