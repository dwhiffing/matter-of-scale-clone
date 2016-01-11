import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import ProfileUtils from 'profiles/utils/ProfileUtils'
import reducers from 'profiles/reducers/ViewedProfileReducers'

const viewedProfile = Factory.create('profile')
const viewedProfileDecorated =  ProfileUtils.decorateProfile(viewedProfile)

describe('ViewedProfileReducers', () => {

  describe('fetchViewedProfileRequest', () => {
    it('should null out the viewedProfile', () => {
      const currentState = viewedProfileDecorated
      const action = {
        type: "FETCH_VIEWED_PROFILE_REQUEST",
      }
      const nextState = null

      expect(reducers(currentState, action)).to.equal(nextState)
    })
  })

  describe('fetchViewedProfile', () => {
    it('should set the viewedProfile based on the profile key on payload', () => {
      const currentState = {}
      const action = {
        type: "FETCH_VIEWED_PROFILE",
        payload: {profile: viewedProfile}
      }
      const nextState = viewedProfileDecorated

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })

    it('should not change when fetching cached Profile', () => {
      const currentState = viewedProfileDecorated
      const action = {
        type: "FETCH_VIEWED_PROFILE",
        payload: {fromCache: true}
      }
      const nextState = viewedProfileDecorated

      expect(reducers(currentState, action)).to.equal(nextState)
    })
  })
})
