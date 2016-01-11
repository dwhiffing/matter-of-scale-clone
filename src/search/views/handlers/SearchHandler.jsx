import React from 'react'
import { changeRoute } from 'shared/utils/History'

import SearchResult from 'search/views/components/SearchResult'
import PriorityAdvert from 'search/views/components/PriorityAdvert'
import { Header, LoadingScreen } from 'shared/views/interface'
import _ from 'lodash'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'
import ResizeMixin from 'shared/views/mixins/ResizeMixin'
import SearchActions from 'search/actions/SearchActions'
import FilterActions from 'search/actions/FilterActions'

import 'search/views/styles/search.scss'

const stateToConnect = mapState(['search', 'filters'])
const actionsToConnect = mapActions([SearchActions, FilterActions])

const SearchHandler = React.createClass({

  mixins: [ResizeMixin],

  componentWillMount() {
    if (this.props.search.needsFetch || this.props.filters.dirty.indexOf('search') > -1) {
      this.props.resetSearchResults(this.props.currentProfile)
      this.props.fetchSearchResults()
    }
  },

  componentDidMount() {
    this.lazyOnScroll = _.throttle(this.onScroll, 300, true)
    addEventListener('scroll', this.lazyOnScroll, false);
  },

  componentWillUnmount() {
    removeEventListener('scroll', this.lazyOnScroll, false);
  },

  onScroll() {
    const requestThreshold = innerHeight / 1.5
    const distanceFromBottom = window.offsetHeight() - scrollY - innerHeight

    if (distanceFromBottom < requestThreshold && !this.props.search.endOfResults && !this.props.search.fetching) {
      this.props.fetchSearchResults()
    }
  },

  headerTitle() {
    return "Search"
  },

  toFilters() {
    changeRoute( '/search/filter')
  },

  headerAccessory() {
    return (
      <span onClick={this.toFilters}>
        Filter
      </span>
    )
  },

  render() {
    let { endOfResults, noResults, fetching, results } = this.props.search

    let footer
    if (fetching) {
      footer = <LoadingScreen className="bg-none py4" noHeader fillParent={results.length !== 0}/>
    } else if (noResults) {
      footer = (
        <div className='flex-column flex middle center' onClick={this.toFilters} style={{height: innerHeight - 110}}>
          <h2 className='my3 gray-50'>
            No results found
          </h2>
          <button className='h2 thick gray'>
            Change Filters
          </button>
        </div>
      )
    } else if (endOfResults) {
      footer = (
        <div className={`h2 gray-70 center-align m4`} onClick={this.toFilters}>
          End of Results
        </div>
      )
    }
    return (
      <div>
        <Header title={this.headerTitle()} rightAccessory={this.headerAccessory()} />

        <section className="search-handler">
          <div className='row'>
            {results.map((item, index) => {

              let result = [
                <SearchResult key={index} result={item} />
              ]

              if (item.advert) {
                result.push(<PriorityAdvert/>)
              }

              return result
            })}
          </div>

          {footer}

        </section>
      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(SearchHandler)
