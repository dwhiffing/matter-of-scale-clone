import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import actions from 'search/actions/DashboardActions'

import nock from 'nock'
import mockStore, {mockActions} from 'shared/test/mockStore'
import {TEST_ROOTS} from 'shared/utils/APIUtils'

describe('DashboardActions', () => {
  const results = Factory.createList(10, 'searchResult')
  const login = 'man'
  const meta = [login]
  const getState = {}
  const payload = {results: results}

  describe('fetchDashboardResults', () => {
    const meta = []
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.JUNTO_API)
        .get('/dashboard_results')
        .reply(200, payload)

      const expectedActions = mockActions('fetchDashboardResults', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchDashboardResults(...meta))
    })
  })

  describe('fetchDashboardVisitors', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.JUNTO_API)
        .get(`/profiles/${login}/visitors`)
        .reply(200, payload)

      const expectedActions = mockActions('fetchDashboardVisitors', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchDashboardVisitors(...meta))
    })
  })

  describe('fetchDashboardActivity', () => {
    it('dispatches success when request is done', (done) => {
      nock(TEST_ROOTS.BRUNEL)
        .get(`/profiles/${login}/activity`)
        .reply(200, payload)

      const expectedActions = mockActions('fetchDashboardActivity', payload, meta)

      mockStore(getState, expectedActions, done).dispatch(actions.fetchDashboardActivity(...meta))
    })
  })

})
