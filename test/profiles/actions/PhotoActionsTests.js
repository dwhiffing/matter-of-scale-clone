import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/PhotoActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

const photosPublic = Factory.createList(3, 'photo')
const photosPrivate = Factory.createList(3, 'photo', {private: true})
const allPhotos = photosPublic.concat(photosPrivate)

describe('PhotosActions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const getState = {}
  const login = 'man'
  const id = 1
  const data = {test: true}

  describe('fetchPhotos', () => {
    const meta = [login]
    const payload = {photos: allPhotos}

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .get('/profiles/man/photos')
        .reply(200, payload)

      const expectedActions = mockActions('fetchPhotos', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchPhotos(...meta))
    })

    it('should return "fromCache" if the same photos are fetched again', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .get('/profiles/man/photos')
        .reply(200, payload)

      const cachePayload = {fromCache: true}
      const expectedActions = mockActions('fetchPhotos', cachePayload, meta, false)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchPhotos(...meta))
    })
  })

  describe('uploadPhoto', () => {
    const meta = [data, login]
    const payload = {photos: allPhotos}

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .post('/profiles/man/photos')
        .reply(200)
      nock(TEST_ROOTS.BRUNEL)
        .get('/profiles/man/photos')
        .reply(200, payload)

      const expectedActions = mockActions('uploadPhoto', payload, meta)
      const asyncAction = actions.uploadPhoto(...meta)

      mockStore(getState, expectedActions, done).dispatch(asyncAction)
    })
  })

  describe('deletePhoto', () => {
    const meta = [id, login]
    const payload = {}

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .intercept(`/profiles/${login}/photos/${id}`, 'DELETE')
        .reply(200)
      nock(TEST_ROOTS.BRUNEL)
        .get(`/profiles/${login}/photos`)
        .reply(200, payload)

      const expectedActions = mockActions('deletePhoto', payload, meta)
      const asyncAction = actions.deletePhoto(...meta)

      mockStore(getState, expectedActions, done).dispatch(asyncAction)
    })
  })

  describe('updatePhoto', () => {
    const data = {test: true}
    const meta = [id, data, login]
    const payload = {}

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .put(`/profiles/${login}/photos/${id}`)
        .reply(200)
      nock(TEST_ROOTS.BRUNEL)
        .get(`/profiles/${login}/photos`)
        .reply(200, payload)

      const expectedActions = mockActions('updatePhoto', payload, meta)
      const asyncAction = actions.updatePhoto(...meta)

      mockStore(getState, expectedActions, done).dispatch(asyncAction)
    })
  })

})
