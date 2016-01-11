import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers, {loginAndPhoto} from 'search/reducers/DashboardReducers'

describe('DashboardReducers', () => {

  describe('fetchDashboardResults', () => {
    const newResults = Factory.createList(6, 'dashResult')
    const onlineResults = Factory.createList(6, 'dashResult')
    const currentState = { recent: null, online: null }

    it('should update the dashboard based on the recent and online keys on payload', () => {
      const action = {
        type: "FETCH_DASHBOARD_RESULTS",
        payload: {new: newResults, online: onlineResults}
      }
      const nextState = {
        recent: newResults.map(loginAndPhoto),
        online: onlineResults.map(loginAndPhoto)
      }
      expect(reducers(currentState, action)).deep.equal(nextState)
    })

    it('should return empty array when payload is invalid', () => {
      const action = {
        type: "FETCH_DASHBOARD_RESULTS",
        payload: {}
      }
      const nextState = {
        recent: [],
        online: []
      }
      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('fetchDashboardVisitors', () => {
    const visitors = Factory.createList(6, 'dashResult')
    const currentState = { visitors: null }
    const action = {
      type: "FETCH_DASHBOARD_VISITORS",
      payload: {profiles: visitors}
    }

    it('should update the dashboard based on the recent and online keys on payload', () => {
      const nextState = {
        visitors: visitors.map(loginAndPhoto),
      }
      expect(reducers(currentState, action)).deep.equal(nextState)
    })

    it('should return empty array when payload is invalid', () => {
      const action = {
        type: "FETCH_DASHBOARD_VISITORS",
        payload: {}
      }
      const nextState = {
        visitors: []
      }
      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('fetchDashboardActivity', () => {
    const activity = Factory.createList(6, 'activity')
    const currentState = { activity: null }
    const action = {
      type: "FETCH_DASHBOARD_ACTIVITY",
      payload: {activity: activity}
    }

    it('should update the dashboard based on the recent and online keys on payload', () => {
      const nextState = {
        activity: activity,
      }
      expect(reducers(currentState, action)).deep.equal(nextState)
    })

    it('should return empty array when payload is invalid', () => {
      const action = {
        type: "FETCH_DASHBOARD_ACTIVITY",
        payload: {}
      }
      const nextState = {
        activity: []
      }
      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

})
