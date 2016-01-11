import {expect} from 'chai'
import actions from 'search/actions/FilterActions'

describe('FilterActions', () => {

  describe('changeFilter', () => {
    let payload = actions.changeFilter({location: 'Toronto'}).payload

    it('should create a payload with the passed object', () => {
      expect(payload).to.deep.equal({location: 'Toronto'})
    })
  })

  describe('saveFilters', () => {
    let payload = actions.saveFilters().payload

    it('should have a null payload', () => {
      expect(payload).to.deep.equal(null)
    })
  })

  describe('revertFilters', () => {
    let payload = actions.revertFilters().payload

    it('should have a null payload', () => {
      expect(payload).to.deep.equal(null)
    })
  })

  describe('resetFilters', () => {
    let payload = actions.resetFilters().payload

    it('should have a null payload', () => {
      expect(payload).to.deep.equal(null)
    })
  })

})
