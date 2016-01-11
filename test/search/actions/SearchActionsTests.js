import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'search/actions/SearchActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('SearchActions', () => {
  const results = Factory.createList(10, 'searchResult')
  const meta = []
  const getState = []
  const payload = {results}

  describe('fetchSearchResults', () => {

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.JUNTO_API)
        .get('/search')
        .query(true)
        .reply(200, payload)

      const expectedActions = mockActions('fetchSearchResults', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchSearchResults(...meta))
    })
  })

  describe('resetSearchResults', () => {
    const profile = Factory.create('profile')
    const payload = actions.resetSearchResults(profile).payload

    it('should return a payload with the currentProfile', () => {
      expect(payload).to.equal(profile)
    })
  })

})
