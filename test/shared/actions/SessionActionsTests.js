import {dispatch} from 'shared/redux/store'
import {expect} from 'chai'
import actions from 'shared/actions/SessionActions'

describe('SessionActions', () => {

  describe('bootSessionFromCookie', () => {
    it('should logout if missing junto cookie')
    it('should logout if login request fails')
    it('should logout if access_token response is invalid')
    it('should logout dispatch all currentProfile actions on successful login')
  })

})
