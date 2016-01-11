import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'profiles/actions/CurrentProfileActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('CurrentProfileActions', () => {
  const login = 'man'
  const profile = Factory.create('profile')

  const meta = [login]
  const payload = {profile: profile}
  const getState = {}

  describe('fetchCurrentProfile', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .get(`/profiles/${login}`)
        .reply(200, payload)

      const expectedActions = mockActions('fetchCurrentProfile', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchCurrentProfile(...meta))
    })
  })

  describe('patchCurrentProfile', () => {
    it('dispatches success when request is done for profile model', (done) => {
      const zip = '123456'
      const payload = {profile: {zip: zip}}
      const meta = [login, 'zip', zip]

      nock(TEST_ROOTS.BRUNEL)
        .patch(`/profiles/${login}`, payload)
        .reply(200, payload)

      const expectedActions = mockActions('patchCurrentProfile', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.patchCurrentProfile(...meta))
    })

    it('dispatches success when request is done for profile model', (done) => {
      const hairColour = 'Brown'
      const payload = {preference: {hair_colour: hairColour}}
      const meta = [login, 'hair_colour', hairColour]

      nock(TEST_ROOTS.BRUNEL)
        .patch(`/profiles/${login}/preferences`, payload)
        .reply(200, payload)

      const expectedActions = mockActions('patchCurrentProfile', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.patchCurrentProfile(...meta))
    })

    it('dispatches success when request is done for profile model', (done) => {
      const tagline = 'SuperCool'
      const payload = {extension: {tagline: tagline}}
      const meta = [login, 'tagline', tagline]

      nock(TEST_ROOTS.BRUNEL)
        .patch(`/profiles/${login}/extensions`, payload)
        .reply(200, payload)

      const expectedActions = mockActions('patchCurrentProfile', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.patchCurrentProfile(...meta))
    })

  })
})
