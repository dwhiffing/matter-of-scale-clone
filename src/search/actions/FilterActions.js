import { actionCreator } from 'shared/redux/helpers'
import SearchUtils from 'search/utils/SearchUtils'

const FilterActions = {

  changeFilter: (filter) => filter,

  saveFilters: () => null,

  revertFilters: () => null,

  resetFilters: () => null
}

export default actionCreator(FilterActions)
