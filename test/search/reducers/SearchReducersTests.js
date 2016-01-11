import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import reducers from 'search/reducers/SearchReducers'

const results = Factory.createList(10, 'searchResult')

describe('SearchReducers', () => {

  describe('fetchSearchResultsRequest', () => {
    const currentState = Factory.create('searchSettings')
    const action = {type: "FETCH_SEARCH_RESULTS_REQUEST"}

    it('should set fetching to true', () => {
      expect(reducers(currentState, action).fetching).equal(true)
    })
  })

  describe('fetchSearchResults', () => {
    const priority = Factory.create('searchResult')
    const currentState = Factory.create('searchSettings', {fetching: true})
    const action = {type: "FETCH_SEARCH_RESULTS", payload: {profiles: results}}

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
      const action = {type: "FETCH_SEARCH_RESULTS", payload: {profiles: results.slice(0,4)}}
      expect(reducers(currentState, action).endOfResults).equal(true)
    })

    it('should set endOfResults to false when a page has 10 results', () => {
      expect(reducers(currentState, action).endOfResults).equal(false)
    })

    it('should set noResults to true when a page has 0 results and page is equal to 1', () => {
      const action = {type: "FETCH_SEARCH_RESULTS", payload: {profiles: []}}

      expect(reducers(currentState, action).noResults).equal(true)
    })

    it('should prepend the currentState advert if showAdvert is true', () => {
      const state = {advert: {advert: true}, showAdvert: true}
      const currentState = Factory.create('searchSettings', state)
      const nextResults = reducers(currentState, action).results

      expect(nextResults).deep.equal([{advert: true}].concat(results))
    })

    it('should not prepend the advert if showAdvert is false', () => {
      const state = {advert: {advert: true}, showAdvert: false}
      const currentState = Factory.create('searchSettings', state)
      const nextResults = reducers(currentState, action).results

      expect(nextResults).deep.equal(results)
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

  describe('resetSearchResults', () => {
    const currentState = Factory.create('searchSettings', {results: results})

    const female = Factory.create('female-profile')
    const male = Factory.create('profile', {subscriber: true})

    const actionFemale = {type: "RESET_SEARCH_RESULTS", payload: female}
    const actionMale = {type: "RESET_SEARCH_RESULTS", payload: male}

    const maleState = reducers(currentState, actionMale)
    const femaleState = reducers(currentState, actionFemale)

    it('should empty the results', () => {
      expect(femaleState.results).to.be.empty
      expect(femaleState.page).to.equal(1)
    })

    it('should build an advert based on the given profile', () => {
      expect(femaleState.advert).to.deep.equal({
        advert: true,
        login: female.login,
        age: female.preference.age,
        location: `${female.city}, ${female.state}`,
        large_photo_url: female.extension.profile_photo_url.replace('medium', 'large')
      })
      expect(maleState.advert).to.deep.equal({
        advert: true,
        login: male.login,
        age: male.preference.age,
        location: `${male.city}, ${male.state}`,
        large_photo_url: male.extension.profile_photo_url.replace('medium', 'large')
      })
    })

    it('should set showPriority correctly', () => {
      expect(maleState.showPriority).to.equal(false)
      expect(femaleState.showPriority).to.equal(true)
    })

    it('should set showAdvert correctly', () => {
      expect(maleState.showAdvert).to.equal(true)
      expect(femaleState.showAdvert).to.equal(false)
    })

  })
})
