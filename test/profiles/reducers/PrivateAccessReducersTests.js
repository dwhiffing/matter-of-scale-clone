import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers from 'profiles/reducers/PrivateAccessReducers'

const grantersList = Factory.createList(3, 'simpleProfile')
const initialState = []

describe('PrivateAccessReducers', () => {

  describe('fetchCurrentProfile', () => {
    const currentState = {granters: []}
    const action = {type: "FETCH_CURRENT_PROFILE", payload: {session_profile: {access_granters: grantersList}}}
    const nextState = {granters: grantersList}

    it('should set the granters based on the access_granters payload key', () => {
      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('requestAccess', () => {
    const currentState = {recentlyRequested: ['RequesterMcGoo']}
    const action = {type: "REQUEST_ACCESS", meta: ['RequesterMcGee']}
    const nextState = {recentlyRequested: ['RequesterMcGoo','RequesterMcGee']}

    it('should set the recentlyRequested based on the meta key', () => {
      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

})
