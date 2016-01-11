import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'

let _cachedLogin

const ViewedProfileActions = {

  fetchViewedProfile(login) {
    if (_cachedLogin === login) {
      return { fromCache: true }
    }

    _cachedLogin = login

    return request.brunel.get(`/profiles/${login}`)
  }

}

export default actionCreator(ViewedProfileActions)
