import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers, { getPhotoIndexByID, routeToPhotoID } from 'profiles/reducers/PhotoReducers'

const photosPublic = Factory.createList(3, 'photo').concat()
const photosPrivate = Factory.createList(3, 'photo', {private: true})
const allPhotos = photosPublic.concat(photosPrivate)
const defaultResponse = (type) => {
  return {
    type,
    payload: {photos: allPhotos, abortRouteChange: true},
    meta: [0]
  }
}

describe('PhotoReducers', () => {

  describe('getPhotoIndexByID', () => {
    const index = 2
    const id = allPhotos[index].id
    const photos = allPhotos

    it('should return the correct index', () => {
      expect(getPhotoIndexByID(photos, id)).to.equal(index)
    })
  })

  describe('routeToPhotoID', () => {
    const index = 2
    const id = allPhotos[index].id
    const newRoute = `/profiles/edit/photos/${index + 1}`

    it('should return the route to the passed photo ID', () => {
      expect(routeToPhotoID(allPhotos, id)).to.equal(newRoute)
    })

    it('should return undefined if already at the route in question', () => {
      expect(routeToPhotoID(allPhotos, id, newRoute)).to.equal(undefined)
    })
  })

  describe('fetchPhotosRequest', () => {
    it('nulls out the currentState state', () => {
      const currentState = {}
      const action = {type: "FETCH_PHOTOS_REQUEST"}
      expect(reducers(currentState, action)).to.equal(null)
    })
  })

  describe('fetchPhotos', () => {
    it('should add photos from payload', () => {
      const currentState = {}
      const action = {
        type: "FETCH_PHOTOS",
        payload: {photos: allPhotos}
      }
      const nextState = photosPublic.concat(photosPrivate)

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })

    it('should not change when fetching cached photos', () => {
      const currentState = photosPublic
      const fromCacheAction = {
        type: "FETCH_PHOTOS",
        payload: {fromCache: true}
      }
      const nextState = photosPublic

      expect(reducers(photosPublic, fromCacheAction)).to.equal(nextState)
    })
  })

  describe('uploadPhoto', () => {
    const currentState = {}, action = defaultResponse("UPLOAD_PHOTO")
    const nextState = allPhotos

    it('should return the updated photo list', () => {
      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

  describe('deletePhoto', () => {
    const currentState = {}, action = defaultResponse("DELETE_PHOTO")
    const nextState = allPhotos

    it('should return the updated photo list', () => {
      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

  describe('updatePhoto', () => {
    const currentState = {}, action = defaultResponse("UPDATE_PHOTO")
    const nextState = allPhotos

    it('should return the updated photo list', () => {
      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

})
