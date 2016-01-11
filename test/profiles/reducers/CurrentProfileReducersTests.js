import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import ProfileUtils from 'profiles/utils/ProfileUtils'
import reducers from 'profiles/reducers/CurrentProfileReducers'

const currentProfile = Factory.create('profile')
const currentProfileDecorated = ProfileUtils.decorateProfile(currentProfile)

describe('CurrentProfileReducers', () => {

  describe('fetchCurrentProfile', () => {
    const currentState = {}
    const action = {type: "FETCH_CURRENT_PROFILE", payload: {session_profile: currentProfile}}

    it('should set the currentProfile based on the profile key on payload', () => {
      const nextState = currentProfileDecorated

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

  describe('patchCurrentProfile', () => {
    const currentState = currentProfileDecorated

    it('should update key to "profile"', () => {
      const zip = '123456'
      const profile = {type: "PATCH_CURRENT_PROFILE", meta: ['zip', zip]}

      expect(reducers(currentState, profile).zip).to.equal(zip)
    })

    it('should update extension key to "extension"', () => {
      const tagline = 'SuperCool'
      const extension = {type: "PATCH_CURRENT_PROFILE", meta: ['tagline', tagline]}

      expect(reducers(currentState, extension).extension.tagline).to.equal(tagline)
    })

    it('should update preference key to "preference"', () => {
      const hairColour = 'Brown'
      const preference = {type: "PATCH_CURRENT_PROFILE", meta: ['hair_colour', hairColour]}

      expect(reducers(currentState, preference).preference.hair_colour).to.equal(hairColour)
    })
  })

})
