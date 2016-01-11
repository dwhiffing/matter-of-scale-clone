import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'

const PrivateAccessActions = {

  requestAccess(receiver){
    return request.junto
      .get(`/private_access/${receiver}`)
  }
}

export default actionCreator(PrivateAccessActions)
