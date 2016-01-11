import { reducerCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'
import {mapJuntoResults} from 'search/utils/SearchUtils'

export const initialState = {
  showAdvert: null,
  showPriority: null,
  fetching: false,
  needsFetch: true,
  noResults: false,
  endOfResults: false,
  results: [],
  priorityResults: [],
  page: 1
}

const SearchReducers = {

  fetchSearchResultsRequest(state, action) {
    return Object.assign({}, state, {fetching: true, needsFetch: false})
  },

  fetchSearchResults(state, action) {
    let priorityResults = action.payload.priority_profiles || state.priorityResults
    let newResults = action.payload.profiles.map(mapJuntoResults)

    if (state.showAdvert && state.advert) {
      newResults = [state.advert].concat(newResults)

    } else if (state.showPriority && newResults.length > 0 && priorityResults.length > 0) {
      let index = (state.page - 1) % priorityResults.length
      let priorityResult = priorityResults[index]
      priorityResult.priority = true

      newResults = [priorityResult].concat(newResults)
    }

    return Object.assign({}, state, {
      fetching: false,
      results: state.results.concat(newResults),
      priorityResults: priorityResults.map(mapJuntoResults),
      endOfResults: newResults.length < 10,
      noResults: state.page === 1 && newResults.length === 0,
      page: state.page + 1
    })
  },

  resetSearchResults(state, action) {
    let profile = action.payload
    let female = profile.gender === 'female'
    let profileAdvert = {
      advert: true,
      login: profile.login,
      age: profile.preference.age,
      location: `${profile.city}, ${profile.state}`,
      large_photo_url: profile.extension.profile_photo_url.replace('medium', 'large')
    }

    return Object.assign({}, state, {
      results: [],
      page: 1,
      advert: profileAdvert,
      showPriority: female,
      showAdvert: !female && profile.subscriber && !profile.priority_listing_purchased
    })
  }
}

export default reducerCreator(SearchReducers, initialState)
