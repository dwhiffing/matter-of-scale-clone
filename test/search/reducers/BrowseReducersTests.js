import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers from 'search/reducers/BrowseReducers'

const results = Factory.createList(10, 'searchResult')

describe('BrowseReducers', () => {

  describe('fetchBrowseResultsRequest', () => {
    const currentState = Factory.create('searchSettings')
    const action = {type: "FETCH_BROWSE_RESULTS_REQUEST"}

    it('should set fetching to true', () => {
      expect(reducers(currentState, action).fetching).equal(true)
    })
  })

  describe('fetchBrowseResults', () => {
    const priority = Factory.create('searchResult')
    const currentState = Factory.create('searchSettings', {fetching: true})
    const action = {type: "FETCH_BROWSE_RESULTS", payload: {profiles: results}}

    it('should update the state with new results', () => {
      const state = {priorityResults: [priority], showPriority: true}
      const nextState = Object.assign({}, currentState, {
        fetching: false,
        page: 2,
        results: results
      })

      expect(reducers(currentState, action)).deep.equal(nextState)
    })

    it('should set endOfResults to true when a page has < 10 results', () => {
      const action = {type: "FETCH_BROWSE_RESULTS", payload: {profiles: results.slice(0,4)}}
      expect(reducers(currentState, action).endOfResults).equal(true)
    })

    it('should set endOfResults to false when a page has 10 results', () => {
      expect(reducers(currentState, action).endOfResults).equal(false)
    })

    it('should set noResults to true when a page has 0 results and page is equal to 1', () => {
      const action = {type: "FETCH_BROWSE_RESULTS", payload: {profiles: []}}

      expect(reducers(currentState, action).noResults).equal(true)
    })

    it('should prepend a priority result if there are priority results', () => {
      const state = {priorityResults: [priority], showPriority: true}
      const currentState = Factory.create('searchSettings', state)
      const nextResults = reducers(currentState, action).results

      expect(nextResults).deep.equal([priority].concat(results))
    })

    it('should not prepend a priority result if showPriority is false', () => {
      const state = {priorityResults: [priority], showPriority: false}
      const currentState = Factory.create('searchSettings', state)
      const nextResults = reducers(currentState, action).results

      expect(nextResults).deep.equal(results)
    })

  })

  describe('doBrowseAction', () => {

    it('increments the index value', () => {
      const currentState = Factory.create('searchSettings', {index: 0})
      const action = {type: 'DO_BROWSE_ACTION'}

      expect(reducers(currentState, action).index).to.equal(1)
    })

    it('should set needsFetch true if more than half way through results', () => {
      const results = Factory.createList(20, 'searchResult')
      const currentState = Factory.create('searchSettings', {index: 11, fetching: false, results})
      const action = {type: 'DO_BROWSE_ACTION'}

      expect(reducers(currentState, action).needsFetch).to.equal(true)
    })

    it('should set needsFetch false if less than half way through results', () => {
      const results = Factory.createList(20, 'searchResult')
      const currentState = Factory.create('searchSettings', {index: 5, fetching: false, results})
      const action = {type: 'DO_BROWSE_ACTION'}

      expect(reducers(currentState, action).needsFetch).to.equal(false)
    })

  })

  describe('resetBrowseResults', () => {
    const currentState = Factory.create('searchSettings', {results: results})

    const female = Factory.create('female-profile')
    const male = Factory.create('profile', {subscriber: true})

    const actionFemale = {type: "RESET_BROWSE_RESULTS", payload: female}
    const actionMale = {type: "RESET_BROWSE_RESULTS", payload: male}

    const maleState = reducers(currentState, actionMale)
    const femaleState = reducers(currentState, actionFemale)

    it('should empty the results', () => {
      expect(femaleState.results).to.be.empty
      expect(femaleState.page).to.equal(1)
    })

    it('should set showPriority correctly', () => {
      expect(maleState.showPriority).to.equal(false)
      expect(femaleState.showPriority).to.equal(true)
    })

  })
})
