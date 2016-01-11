import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'search/actions/BrowseActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('BrowseActions', () => {
  const results = Factory.createList(10, 'searchResult')
  const meta = []
  const getState = {}

  describe('fetchBrowseResults', () => {
    const payload = {profiles: results}

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.JUNTO_API)
        .get('/search')
        .query(true)
        .reply(200, payload)

      const expectedActions = mockActions('fetchBrowseResults', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchBrowseResults(...meta))
    })
  })

  describe('doBrowseAction', () => {
    const action = 'flirt'
    const login = 'man'

    it('dispatches success when request is done', (done) => {
      const meta = [action, login]
      const payload = {}

      nock(TEST_ROOTS.JUNTO)
        .post('/browse/update')
        .query({[action]: 'true', login: login})
        .reply(200, payload)

      const expectedActions = mockActions('doBrowseAction', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.doBrowseAction(...meta))
    })

    it('should return null when fakeAction is true', (done) => {
      const meta = [action, login, true]
      const payload = null

      const expectedActions = mockActions('doBrowseAction', payload, meta, false)

      mockStore(getState, expectedActions, done).dispatch(actions.doBrowseAction(...meta))
    })
  })

  describe('resetBrowseResults', () => {
    const profile = Factory.create('profile')
    const payload = actions.resetBrowseResults(profile).payload

    it('should set up profile', () => {
      expect(payload).to.equal(profile)
    })
  })

})
