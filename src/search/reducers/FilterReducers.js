import { reducerCreator } from 'shared/redux/helpers'
import ProfileUtils from 'profiles/utils/ProfileUtils'
import PersistUtils from 'shared/utils/PersistUtils'
import store from 'shared/redux/store'

const storeKey = '_storedFilterSettings'
const savedFilters = PersistUtils.getSaved(storeKey)

const defaultFilters = {
  dirty: [],
  // array filters
  body_type: [],
  eye_colour: [],
  hair_colour: [],
  ethnicity: [],
  language: [],
  subscriptionStatus: [],

  // range filters
  ages: null,
  heights: [60, 77],
  distance: [50],

  // string filters
  location: '',
  sortBy: 'popularity',
  keywords: '',
  distanceMeasurement: 'mi',

  // boolean filters
  publicPhotos: true,
  privatePhotos: false,
  onlineStatus: false,
  availableForChat: false,
  newMember: false,
  excludeContacted: false,
}

/* istanbul ignore next: not sure if this should be tested, tending towards no */
export const initialState = savedFilters ? savedFilters : defaultFilters

const FilterReducers = {
  changeFilter(state, action) {
    return Object.assign({}, state, action.payload, {dirty: ['search', 'browse']})
  },

  saveFilters(state, action) {
    PersistUtils.save(storeKey, state)
    return state
  },

  fetchSearchResults(state, action) {
    return Object.assign({}, state, {
      dirty: state.dirty.filter(f => f !== 'search')
    })
  },

  fetchBrowseResults(state, action) {
    return Object.assign({}, state, {
      dirty: state.dirty.filter(f => f !== 'browse')
    })
  },

  revertFilters(state, action) {
    return Object.assign({}, PersistUtils.getSaved(storeKey), {dirty: []})
  },

  resetFilters(state, action) {
    let profile = action.meta[0]

    return Object.assign({}, defaultFilters, {
      ages: ProfileUtils.age_ranges[profile.gender],
      location: `${profile.city}, ${profile.state}`
    })
  }
}

export default reducerCreator(FilterReducers, initialState)
