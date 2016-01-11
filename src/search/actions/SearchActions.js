import request from 'shared/utils/APIUtils'
import Utils from 'search/utils/SearchUtils'
import { actionCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'

const SearchActions = {

  fetchSearchResults() {
    let filters = store.getState().filters
    let search = store.getState().search

    return request.junto_api
      .get(`/search${Utils.getParams(filters, search)}`)
  },

  resetSearchResults: currentProfile => currentProfile

}

export default actionCreator(SearchActions)
