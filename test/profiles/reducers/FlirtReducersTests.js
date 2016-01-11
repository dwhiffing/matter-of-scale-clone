import {expect} from 'chai'
import reducers from 'profiles/reducers/FlirtReducers'

describe('FlirtReducers', () => {

  describe('sendFlirt', () => {
    const currentState = []
    const action = {
      type: "SEND_FLIRT",
      payload: {},
      meta: ["AwesomeRaymon95"]
    }

    it('add the login to the flirted list', () =>{
      const nextState = [{login: "AwesomeRaymon95"}]

      expect(reducers(currentState, action)).to.deep.equal(nextState)
    })
  })

})
