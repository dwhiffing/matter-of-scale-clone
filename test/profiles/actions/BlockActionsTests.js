import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/BlockActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('BlockActions', () => {
  const id = 'newBlock'
  const login = 'man'
  const data = {block: {id: 'newBlock'}}

  const meta = [id, login]
  const payload = {profiles: []}
  const getState = {}

  describe('addBlock', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .post(`/profiles/${login}/blocks`, data)
        .reply(200, payload)

      const expectedActions = mockActions('addBlock', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.addBlock(...meta))
    })
  })

  describe('removeBlock', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .intercept(`/profiles/${login}/blocks/${id}`, 'DELETE')
        .reply(200, payload)

      const expectedActions = mockActions('removeBlock', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.removeBlock(...meta))
    })
  })

})
