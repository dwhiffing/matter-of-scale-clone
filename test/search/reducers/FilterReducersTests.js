import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers from 'search/reducers/FilterReducers'

const defaultFilters = Factory.create('filterSettings')
const results = Factory.createList(10, 'searchResult')

describe('FilterReducers', () => {

  describe('changeFilter', () => {
    const currentState = Factory.create('filterSettings')
    const change = {privatePhotos: true}
    const action = {type: "CHANGE_FILTER", payload: change}

    it('should update store values properly', () => {
      expect(reducers(currentState, action).privatePhotos).to.equal(true)
    })

    it('should clear dirty', () => {
      const currentState = Factory.create('filterSettings', {dirty: []})
      expect(reducers(currentState, action).dirty).to.include.members(['browse', 'search'])
    })
  })

  describe('saveFilters', () => {
    const currentState = Factory.create('filterSettings')
    const action = {type: "SAVE_FILTERS"}

    it('should make return the state unchanged', () => {
      expect(reducers(currentState, action)).to.deep.equal(currentState)
    })
  })

  describe('fetchSearchResults', () => {
    const action = {type: "FETCH_SEARCH_RESULTS", payload: {profiles: results}}

    it('should update dirty for search', () => {
      const currentState = Factory.create('filterSettings', {dirty: ['search', 'browse']})

      expect(reducers(currentState, action).dirty).to.include.members(['browse'])
    })

    it('should update dirty for search with browse clean', () => {
      const currentState = Factory.create('filterSettings', {dirty: ['search']})

      expect(reducers(currentState, action).dirty).to.deep.equal([])
    })
  })

  describe('fetchBrowseResults', () => {
    const action = {type: "FETCH_BROWSE_RESULTS", payload: {profiles: results}}

    it('should update dirty for browse', () => {
      const currentState = Factory.create('filterSettings', {dirty: ['search', 'browse']})

      expect(reducers(currentState, action).dirty).to.include.members(['search'])
    })

    it('should update dirty for browse with search already in', () => {
      const currentState = Factory.create('filterSettings', {dirty: ['browse']})

      expect(reducers(currentState, action).dirty).to.deep.equal([])
    })
  })

  describe('revertFilters', () => {
    const currentState = Factory.create('filterSettings', {dirty: ['browse', 'search']})
    const action = {type: "REVERT_FILTERS"}

    it('should clear dirty', () => {
      expect(reducers(currentState, action).dirty).to.deep.equal([])
    })
  })

  describe('resetFilters', () => {
    const male = Factory.create('profile')
    const female = Factory.create('profile', {gender: 'female'})
    const currentState = Factory.create('filterSettings', {publicPhotos: false, privatePhotos: true})

    it('should reset to default filters for males', () => {
      const action = {type: "RESET_FILTERS", meta: [male]}
      const defaultFilters = Factory.create('filterSettings', {location: `${male.city}, ${male.state}`, ages: [35, 65]})
      expect(reducers(currentState, action)).to.deep.equal(defaultFilters)
    })

    it('should reset to default filters for females', () => {
      const defaultFilters = Factory.create('filterSettings', {location: `${female.city}, ${female.state}`, ages: [18, 35]})
      const action = {type: "RESET_FILTERS", meta: [female]}
      expect(reducers(currentState, action)).to.deep.equal(defaultFilters)
    })
  })

})
