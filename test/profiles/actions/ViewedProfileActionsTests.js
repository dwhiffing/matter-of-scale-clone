import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/ViewedProfileActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

const viewedProfile = Factory.create('profile')

describe('ViewedProfileActions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchViewedProfile', () => {
    const meta = ['man']
    const getState = null
    const payload = {profile: viewedProfile}

    it('dispatches expected actions on success', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .get('/profiles/man')
        .reply(200, payload)

      const expectedActions = mockActions('fetchViewedProfile', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchViewedProfile(...meta))
    })

    it('dispatches "fromCache" if the same profile is fetched', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .get('/profiles/man')
        .reply(200, payload)

      const cachePayload = {fromCache: true}
      const expectedActions = mockActions('fetchViewedProfile', cachePayload, meta, false)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchViewedProfile(...meta))
    })
  })

})
