import request from 'shared/utils/APIUtils'
import Utils from 'search/utils/SearchUtils'
import { actionCreator } from 'shared/redux/helpers'
import store from 'shared/redux/store'

const BrowseActions = {

  fetchBrowseResults() {
    let filters = store.getState().filters
    let browse = store.getState().browse

    return request.junto_api
      .get(`/search${Utils.getParams(filters, browse)}&has_photos=true`)
  },

  doBrowseAction(action, login, fakeAction=false) {
    if (fakeAction) return null
    return request.junto
      .post(`/browse/update?${action}=true&login=${login}`)
  },

  resetBrowseResults: currentProfile => currentProfile

}

export default actionCreator(BrowseActions)
