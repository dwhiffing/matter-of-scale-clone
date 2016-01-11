import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/PrivateAccessActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('PrivateAccessActions', () => {
  const login = 'man'
  const profile = Factory.create('simpleProfile')
  const meta = [login]
  const getState = {}

  describe('requestAccess', () => {
    const payload = {recentlyRequested: [profile]}

    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.JUNTO)
        .get(`/private_access/${login}`)
        .reply(200, payload)

      const expectedActions = mockActions('requestAccess', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.requestAccess(...meta))
    })
  })

})
