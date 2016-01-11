import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/FavoriteActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('FavoriteActions', () => {
  const id = 'newFav'
  const login = 'man'
  const data = {favorite: {id: 'newFav'}}

  const meta = [id, login]
  const payload = {profiles: []}
  const getState = {}

  describe('addFavorite', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .post(`/profiles/${login}/favorites`, data)
        .reply(200, payload)

      const expectedActions = mockActions('addFavorite', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.addFavorite(...meta))
    })
  })

  describe('removeFavorite', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .intercept(`/profiles/${login}/favorites/${id}`, 'DELETE')
        .reply(200, payload)

      const expectedActions = mockActions('removeFavorite', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.removeFavorite(...meta))
    })
  })

})
