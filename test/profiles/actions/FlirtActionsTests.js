import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/FlirtActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('FlirtActions', () => {
  const login = 'man'
  const profile = Factory.create('simpleProfile')
  const meta = [login]
  const getState = {}
  const payload = {}

  describe('sendFlirt', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.JUNTO)
        .get(`/profiles/${login}/flirts/new`)
        .reply(200)

      const expectedActions = mockActions('sendFlirt', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.sendFlirt(...meta))
    })
  })

})
