import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'
import ProfileUtils from 'profiles/utils/ProfileUtils'
import store from 'shared/redux/store'

const CurrentProfileActions = {

  fetchCurrentProfile(login) {
    return request.brunel.get(`/profiles/${login}`)
  },

  fetchFreeMessages(login) {
    return request.junto_api.get(`/messages/remaining_free_messages`)
  },

  patchCurrentProfile(login, attr, value) {
    let model = ProfileUtils.attrToModel[attr]
    let end_point = model === 'profile' ? '' : `/${model}s`

    // flush junto profile caches
    request.junto_api.put(`/profiles/${login}/flush`).end()

    return request.brunel
      .patch(`/profiles/${login}${end_point}`)
      .send({[model]: {[attr]: value}})
  }

}

export default actionCreator(CurrentProfileActions)
