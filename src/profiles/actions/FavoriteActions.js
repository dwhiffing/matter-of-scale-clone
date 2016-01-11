import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'

const FavoriteActions = {

  addFavorite(id, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .post(`/profiles/${login}/favorites`)
      .send({favorite: {id: id}})
  },

  removeFavorite(id, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .del(`/profiles/${login}/favorites/${id}`)
  }
}

export default actionCreator(FavoriteActions)
