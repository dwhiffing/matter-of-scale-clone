import React from 'react'
import { changeRoute } from 'shared/utils/History'
import Utils from 'profiles/utils/ProfileUtils'
import FilterActions from 'search/actions/FilterActions'

import Header from 'shared/views/interface/Header'
import Geolocator from 'search/views/components/Geolocator'
import {MultiSelector, Selector, SettingRow, Switch, UnitSlider} from 'shared/views/form'
import _ from 'lodash'
import cx from 'classnames'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const subViews = ['language', 'ethnicity', 'eye_colour', 'hair_colour', 'body_type']
const headers = {language: 'Language', ethnicity: 'Ethnicity', body_type: 'Body Type', eye_colour: 'Eye Color', hair_colour: 'Hair Color'}

const stateToConnect = mapState(['filters'])
const actionsToConnect = mapActions([FilterActions])

const FilterHandler = React.createClass({

  componentWillMount() {
    if (this.props.filters.ages === null) {
      const seeking = this.props.currentProfile.gender == 'male' ? 'female' : 'male'
      this.props.changeFilter({ages: Utils.age_ranges[seeking]})
    }

    this.debouncedKeywordUpdate = _.debounce(this.getChangeFunctionFor('keywords'), 1000)
    this.debouncedLocationUpdate = _.debounce(this.getChangeFunctionFor('location'), 1000)

    this.keywordUpdate = (e) => {
      e.persist()
      this.debouncedKeywordUpdate(e.target.value)
    }
    this.locationUpdate = (e) => {
      e.persist()
      this.debouncedLocationUpdate(e.target.value)
    }
  },

  getChangeFunctionFor(name) {
    return (value) => {
      this.props.changeFilter({[name]: value})
    }
  },

  headerAction(action) {
    changeRoute(`/${this.props.params.view}`)
    if (this.props.filters.dirty.length > 0) {
      action()
    }
  },

  headerTitle() {
    return headers[this.props.params.type] || "Filter"
  },

  headerLeftAccessory() {
    if (subViews.indexOf(this.props.params.type) >= 0) return
    let classes = 'transition transition-0-5'
    return (
      <span className={classes} onClick={() => this.headerAction(this.props.revertFilters)}>
        Cancel
      </span>
    )
  },

  headerRightAccessory() {
    if (subViews.indexOf(this.props.params.type) >= 0) return
    let classes = cx('transition transition-0-5', {
      'opacity-0-5': this.props.filters.dirty.length == 0
    })
    return (
      <span className={classes} onClick={() => this.headerAction(this.props.saveFilters)}>
        Done
      </span>
    )
  },

  render() {
    const {filters, currentProfile, params} = this.props
    const seeking = currentProfile.gender == 'male' ? 'female' : 'male'
    let element

    switch (params.type) {

      case 'language':
      case 'ethnicity':
      case 'eye_colour':
      case 'hair_colour':
        const opts = Utils[`${params.type}_opts`]
        element = <MultiSelector value={filters[params.type]} values={opts} onChange={this.getChangeFunctionFor(params.type)} />
        break

      case 'body_type':
        const secondaryHeader = `${Utils.getHeight(filters.heights[0])} - ${Utils.getHeight(filters.heights[1])}`
        const heights = Utils.height_slider_opts
        const bodyTypes = Utils[`${seeking}_${params.type}_opts`]
        element = (
          <div>
            <SettingRow header="Height" className='mt4 mb2 col' secondaryHeader={secondaryHeader}>
              <UnitSlider value={filters.heights} values={heights} onChange={this.getChangeFunctionFor('heights')} icon="pointer-up" />
            </SettingRow>
            <MultiSelector value={filters.bodyTypes} values={bodyTypes} onChange={this.getChangeFunctionFor('bodyTypes')} />
          </div>
        )
        break

      default:
        const ageRange = Utils.age_ranges['range']
        const ageMaxed = filters.ages[1] == Utils.age_ranges[seeking][1]

        element = (
          <div>
            <div className="p2 bg-gray-90" style={{borderBottom: '1px solid #ccc'}}>
              <input type="text" className="py1 center-align rounded" placeholder="Search by username" style={{height: 30, border: '1px solid #ccc'}}
                defaultValue={filters.keywords} onChange={this.keywordUpdate}>
              </input>
            </div>

            <SettingRow header="Sort By" className='mt4 mb2 col-11' showArrow>
              <Selector value={filters.sortBy} className="fit" onChange={this.getChangeFunctionFor('sortBy')} values={Utils.search_sort_opts} />
            </SettingRow>

            <SettingRow header="Age" className='mt4 mb2 col' secondaryHeader={`${filters.ages[0]}-${filters.ages[1]}${ageMaxed ? '+' : ''}`}>
              <UnitSlider value={filters.ages} onChange={this.getChangeFunctionFor('ages')} values={[...ageRange, 1]} icon="calendar" />
            </SettingRow>

            <SettingRow header="Location" className='mt4 mb2 col-12'>
              <input type="text" className="gray-8 bg-clear fit" style={{height: 30, border: 0}} placeholder="Enter your city, country"
                defaultValue={filters.location} onChange={this.locationUpdate}>
              </input>
            </SettingRow>

            <SettingRow header="Distance" className='mt4 mb2 col' secondaryHeader={`${filters.distance[0]} ${filters.distanceMeasurement}`}>
              <UnitSlider value={filters.distance} onChange={this.getChangeFunctionFor('distance')} values={[25, 500, 25]} icon="pointer-down" />
            </SettingRow>

            <SettingRow label="Public Photos" clickChild>
              <Switch disabled value={filters.publicPhotos} onChange={this.getChangeFunctionFor('publicPhotos')} />
            </SettingRow>

            <SettingRow label="Private Photos" clickChild>
              <Switch value={filters.privatePhotos} onChange={this.getChangeFunctionFor('privatePhotos')} />
            </SettingRow>

            <SettingRow label="Is Online" clickChild>
              <Switch value={filters.onlineStatus} onChange={this.getChangeFunctionFor('onlineStatus')} />
            </SettingRow>

            <SettingRow label="New Member" clickChild>
              <Switch value={filters.newMember} onChange={this.getChangeFunctionFor('newMember')} />
            </SettingRow>

            <SettingRow label="Body Type" link='/search/filter/body_type' />
            <SettingRow label="Eye Color" link='/search/filter/eye_colour' />
            <SettingRow label="Hair Color" link='/search/filter/hair_colour' />
            <SettingRow label="Ethnicity" link='/search/filter/ethnicity' />

            <h2 className="py4 weight-3 center-align gray-50 bg-gray-90" onClick={()=>{
              this.props.resetFilters(this.props.currentProfile)
            }}>
              Reset filters
            </h2>
          </div>
        )
    }
    return (
      <div className="gray-8">
        <Header title={this.headerTitle()}
          rightAccessory={this.headerRightAccessory()}
          leftAccessory={this.headerLeftAccessory()}>
        </Header>

        {element}
      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(FilterHandler)
