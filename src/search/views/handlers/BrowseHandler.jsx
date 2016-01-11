import React from 'react'
import { changeRoute } from 'shared/utils/History'

import BrowseActions from 'search/actions/BrowseActions'
import FilterActions from 'search/actions/FilterActions'
import BrowseResult from 'search/views/components/BrowseResult'
import Header from 'shared/views/interface/Header'
import LoadingScreen from 'shared/views/interface/LoadingScreen'
import Icon from 'shared/views/interface/Icon'
import cx from 'classnames'
import _ from 'lodash'
import ResizeMixin from 'shared/views/mixins/ResizeMixin'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

import 'search/views/styles/browse.scss'

const stateToConnect = mapState(['browse', 'filters'])
const actionsToConnect = mapActions([BrowseActions, FilterActions])

// prevent browse action from firing in development mode
// clearing the browse list is annoying while testing
// TODO: This still has a bit of jank and inneffciency

const fakeBrowseAction = !__PRODUCTION__

const BrowseHandler = React.createClass({

  mixins: [ResizeMixin],

  getInitialState() {
    return {
      action: 1
    }
  },

  componentWillMount() {
    const { browse, filters, currentProfile } = this.props
    // set up actions for buttons
    this.notInterested = () => this.delayedNextResult(2)
    this.sendFlirt = () => this.delayedNextResult(0)
    this.sendMessage = () => {
      const login = this.props.browse.results[this.props.browse.index].login
      changeRoute(`/profiles/${login}?message=1`)
    }

    // fetch results if necessary
    if (browse.needsFetch || filters.dirty.indexOf('browse') > -1) {
      this.props.resetBrowseResults(currentProfile)
      this.props.fetchBrowseResults()
    }
  },

  delayedNextResult(action) {
    this.setState({action})
    _.delay(this.nextResult, 400, action)
  },

  nextResult(action, setActive) {
    let login = this.props.browse.results[this.props.browse.index].login
    let actionParam = action == 0 ? 'flirt' : 'ignore'
    let activeButton = null
    this.props.doBrowseAction(actionParam, login, fakeBrowseAction)
    if (setActive) {
      activeButton = action
      _.delay(() => this.setState({activeButton: null}), 1000)
    }
    this.setState({action: 1, activeButton})
  },

  toFilters() {
    changeRoute( '/browse/filter')
  },

  headerTitle() {
    return "Browse"
  },

  headerAccessory() {
    return (
      <span onClick={this.toFilters}>
        Filter
      </span>
    )
  },

  render() {
    const {index, results, fetching, noResults, endOfResults} = this.props.browse
    const {action, activeButton} = this.state

    const clickable = results.length > 0 && index !== results.length && action === 1

    const showFooter = !fetching && index >= results.length-2

    const sectionClass = cx('browse-handler unlimited flex flex-column relative', {
      'disable-click': !action === 1,
      priority: results[index] && results[index].priority
    })

    const buttonClass = (label, action) => {
      return cx(`browse-${label} circle`, {
        'disable-click': !clickable,
        'is-active': action != null && activeButton === action
      })
    }

    return (
      <div>
        <Header title={this.headerTitle()} rightAccessory={this.headerAccessory()} />

        <section className={sectionClass} style={{height: innerHeight-100}}>

          <div className='bg-priority absolute-fill' />

          <div className="flex flex-auto relative overflow-hidden">

            {fetching && <LoadingScreen fillParent />}

            {results.map((profile, resultIndex) => {
              if (index > resultIndex || index < resultIndex - 3) return
              return (
                <BrowseResult
                  key={`result-${resultIndex}`}
                  profile={profile}
                  nextResult={this.nextResult}
                  isDummy={resultIndex >= index + 2}
                  action={action}
                  zIndex={results.length-resultIndex}
                  isCurrent={index === resultIndex}
                  rotation={resultIndex%3 + 1}>
                </BrowseResult>
              )
            })}

            {showFooter &&
              <div className='flex flex-column middle center fit' onClick={this.toFilters} style={{zIndex: 0}}>
                <h2 className='my3 gray-50'>
                  End of Results
                </h2>
                <button className='h2 thick gray'>
                  Change Filters
                </button>
              </div>
            }
          </div>

          <div className="buttons row center middle around">

            <button className={buttonClass('skip', 2)} onClick={this.notInterested}>
              <Icon name='cancel-fat' />
            </button>

            <button className={buttonClass('message')} onClick={this.sendMessage}>
              <Icon name='message' />
            </button>

            <button className={buttonClass('flirt', 0)} onClick={this.sendFlirt}>
              <Icon name='ok' />
            </button>

          </div>

        </section>
      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(BrowseHandler)
