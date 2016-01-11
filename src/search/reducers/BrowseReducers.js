import { reducerCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'
import {mapJuntoResults} from 'search/utils/SearchUtils'

export const initialState = {
  index: 0,
  showPriority: null,
  fetching: false,
  noResults: false,
  endOfResults: false,
  needsFetch: true,
  results: [],
  priorityResults: [],
  page: 1
}

const BrowseReducers = {

  fetchBrowseResultsRequest(state, action) {
    return Object.assign({}, state, {fetching: true, needsFetch: false})
  },

  fetchBrowseResults(state, action) {
    let priorityResults = action.payload.priority_profiles || state.priorityResults
    let newResults = action.payload.profiles.map(mapJuntoResults)

    if (state.showPriority && newResults.length > 0 && priorityResults.length > 0) {
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
      noResults: newResults.length === 0,
      page: state.page + 1
    })
  },

  doBrowseAction(state, action) {
    let halfThrough = state.index > Math.floor(state.results.length/2)
    return Object.assign({}, state, {
      needsFetch: halfThrough && !state.fetching && !state.endOfResults,
      index: state.index + 1
    })
  },

  resetBrowseResults(state, action) {
    let profile = action.payload
    let female = profile.gender === 'female'

    return Object.assign({}, state, {
      results: [],
      page: 1,
      index: 0,
      endOfResults: false,
      noResults: false,
      showPriority: female
    })
  }

}

export default reducerCreator(BrowseReducers, initialState)
