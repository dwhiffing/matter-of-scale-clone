import {expect} from 'chai'
import {actionCreator, reducerCreator, mapActions, mapState} from 'shared/redux/helpers'
import BlockActions from 'profiles/actions/BlockActions'
import store from 'shared/redux/store'

describe('reduxHelpers', () => {

  describe('actionCreator', () => {
    const actions = actionCreator({
      fooAction: () => 'foo',
      barAction: (bar) => bar
    })

    it('should constantize the type', () => {
      expect(actions.fooAction().type).to.equal('FOO_ACTION')
    })
    it('should compute the payload correctly', () => {
      expect(actions.barAction('foo').payload).to.equal('foo')
    })
    it('should compute the meta args correctly', () => {
      expect(actions.barAction('bar').meta).to.deep.equal(['bar'])
    })
  })

  describe('reducerCreator', () => {
    const reducer = reducerCreator({
      fooAction: (state, action) => state,
      barAction: (state, action) => state
    }, [])

    it('should return a function', () => {
      expect(typeof reducer).to.equal('function')
    })
  })

  describe('mapActions', () => {
    it('should map an action object to a new object with dispatch wrapped', () => {
      const result = mapActions([BlockActions])(store.dispatch)
      const results = result.addBlock('login', 'login2')
      expect(result).to.include.keys(['addBlock', 'removeBlock'])
      expect(results).to.not.equal(null)
    })
  })

  describe('mapState', () => {
    it('return a subsection of the reduxStore', () => {
      const result = mapState(['blocks', 'favorites'])(store)
      expect(result).to.include.keys(['blocks', 'favorites'])
    })
  })
})
