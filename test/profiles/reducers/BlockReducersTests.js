import Factory from 'shared/test/mocks'
import reducers from 'profiles/reducers/BlockReducers'
import {expect} from 'chai'

describe('BlockReducers', () => {
  const blockList = Factory.createList(4, 'simpleProfile')

  describe('fetchCurrentProfileRequest', () => {
    const currentState = blockList
    const action = {type: "FETCH_CURRENT_PROFILE_REQUEST"}

    it('should empty the block list', () => {
      const nextState = []

      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('fetchCurrentProfile', () => {
    const currentState = []
    const action = {type: "FETCH_CURRENT_PROFILE", payload: {session_profile: {blocks: blockList}}}

    it('should set the block list from "profiles" key on payload', () => {
      const nextState = blockList

      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('addBlock', () => {
    const currentState = blockList
    const newBlock = Factory.create('simpleProfile')
    const action = {type: "ADD_BLOCK", payload: {profile: newBlock}}

    it('should add new block from profile key on payload', () => {
      const nextState = blockList.concat([newBlock])

      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

  describe('removeBlock', () => {
    const currentState = blockList
    const action = {type: "REMOVE_BLOCK", payload: {}, meta: [2]}

    it('should remove a block from profile key on payload', () => {
      const nextState = blockList.filter(block => block.id != action.meta[0])

      expect(reducers(currentState, action)).deep.equal(nextState)
    })
  })

})
