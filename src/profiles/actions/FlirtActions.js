import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'

const FlirtActions = {

  sendFlirt(receiver) {
    return request.junto
      .get(`/profiles/${receiver}/flirts/new`)
  }

}

export default actionCreator(FlirtActions)
