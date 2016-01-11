import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'

const BlockActions = {

  addBlock(id, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .post(`/profiles/${login}/blocks`)
      .send({block: {id: id}})
  },

  removeBlock(id, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .del(`/profiles/${login}/blocks/${id}`)
  }

}

export default actionCreator(BlockActions)
