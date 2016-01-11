import {expect} from 'chai'
import reducers from 'shared/reducers/SessionReducers'

describe('SessionReducers', () => {
  const currentState = {
    token: null
  }

  describe('setToken', () => {
    it('should set the token from the payload', () => {
      const action = {type: 'SET_TOKEN', payload: 'abc123'}
      expect(reducers(currentState, action).token).to.equal('abc123')
    })

  })

})
