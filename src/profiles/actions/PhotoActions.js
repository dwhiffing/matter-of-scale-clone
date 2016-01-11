import request from 'shared/utils/APIUtils'
import { actionCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'

let _cachedLogin

const PhotoActions = {

  fetchPhotos(login) {
    if (_cachedLogin === login) {
      return { fromCache: true }
    }
    _cachedLogin = login

    return request.brunel.get(`/profiles/${login}/photos`)
  },

  uploadPhoto(formData, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .post(`/profiles/${login}/photos`)
      .send(formData)
      .then(() => request.brunel.get(`/profiles/${login}/photos`))
  },

  deletePhoto(id, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .del(`/profiles/${login}/photos/${id}`)
      .then(() => request.brunel.get(`/profiles/${login}/photos`))
  },

  updatePhoto(id, data, login) {
    login = login /* istanbul ignore next */ || store.getState().currentProfile.login
    return request.brunel
      .put(`/profiles/${login}/photos/${id}`)
      .send({photo: data})
      .then(() => request.brunel.get(`/profiles/${login}/photos`))
  }

}

export default actionCreator(PhotoActions)
