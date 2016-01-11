import { reducerCreator } from 'shared/redux/helpers'
import { replaceRoute } from 'shared/utils/History'

export const initialState = null

export const getPhotoIndexByID = (photos, id) => photos.map(p => p.id).indexOf(id)

export const routeToPhotoID = (photos, photoID, oldRoute) => {
  oldRoute = oldRoute /* istanbul ignore next */ || window.location.hash.split('?')[0].split('#')[1]
  const newIndex = getPhotoIndexByID(photos, photoID)
  const newRoute = `/profiles/edit/photos/${newIndex + 1}`
  if (oldRoute !== newRoute) {
    return newRoute
  }
}

const PhotoReducers = {

  fetchPhotosRequest: (state, action) => null,

  fetchPhotos(state, action) {
    return action.payload.fromCache ? state : action.payload.photos
  },

  uploadPhoto(state, action) {
    return action.payload.photos
  },

  updatePhoto(state, action) {
    const photoID = action.meta[0]
    const { photos, abortRouteChange } = action.payload
    /* istanbul ignore next */
    if (!abortRouteChange) {
      replaceRoute(routeToPhotoID(photos, photoID))
    }
    return photos
  },

  deletePhoto(state, action) {
    const photoID = action.meta[0]
    const { photos, abortRouteChange } = action.payload
    const newIndex = getPhotoIndexByID(photos, photoID) + 1
    /* istanbul ignore next */
    if (!abortRouteChange) {
      replaceRoute(`/profiles/edit/photos/${newIndex}`)
    }
    return photos
  }
}

export default reducerCreator(PhotoReducers, initialState)
