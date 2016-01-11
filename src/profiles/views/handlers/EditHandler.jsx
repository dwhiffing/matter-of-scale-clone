import React from 'react'
import { changeRoute } from 'shared/utils/History'

import CurrentProfileActions from 'profiles/actions/CurrentProfileActions'
import PhotoActions from 'profiles/actions/PhotoActions'

import ProfileSummary from 'profiles/views/components/ProfileSummary'
import Input from 'shared/views/form/Input'
import ProfileUtils from 'profiles/utils/ProfileUtils'

import LoadingScreen from 'shared/views/interface/LoadingScreen'
import { Header, WideHeading } from 'shared/views/interface'
import Icon from 'shared/views/interface/Icon'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const stateToConnect = mapState(['photos'])
const actionsToConnect = mapActions([PhotoActions, CurrentProfileActions])

let EditDetail

/**
 * Generates a preview of the currentProfile and Accompanying interface to edit it's fields
 * @class EditHandler
 **/
const EditHandler = React.createClass({

  propTypes: {
    /** currently logged in profile */
    currentProfile: React.PropTypes.object,
    /** photos of profile being viewed */
    photos: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      currentProfile: null,
      photos: []
    }
  },

  componentWillMount() {
    const { login, gender } = this.props.currentProfile
    this.props.fetchPhotos(login)

    EditDetail = ({attr, ...rest}) => {
      let options = ProfileUtils[`${attr}_opts`] ? ProfileUtils[`${attr}_opts`] : null
      if (attr == 'body_type') {
        options = ProfileUtils[`${gender}_${attr}_opts`]
      }
      return (
        <Input attr={attr} options={options} {...rest}
          value={ProfileUtils.getProfileValue(attr, this.props.currentProfile)}
          onChange={value => {this.props.patchCurrentProfile(login, attr, value)}}/>
      )
    }
  },

  headerTitle() {
    return "My Profile"
  },

  render() {
    let {currentProfile, photos} = this.props

    if (!currentProfile || !photos) {
      return <LoadingScreen />
    }

    return (
      <div>
        <Header title={this.headerTitle()} />

        <section>

          <ProfileSummary isCurrent profile={currentProfile} photos={photos} />


          <div className='profile-details edit'>
            <button className="rect" onClick={() => changeRoute('/profiles/edit/photos')}>
              {!currentProfile.extension.profile_photo_url ? 'Add Photo' : 'Manage Photos'}
            </button>

            <EditDetail attr='tagline' heading='tagline' maxLength={250} />

            <WideHeading>
              BASICS
            </WideHeading>

            <div className='basics row'>
              <EditDetail attr='birthdate' className='col-6' icon='calendar'/>

              <EditDetail attr='height' className='col-6' icon='resize-vertical'/>

              <EditDetail attr='ethnicity' className='col-7' icon='user'/>

              <EditDetail attr='body_type' className='col-5' icon='male'/>

              <EditDetail attr='hair_colour' className='col-6' icon='hair'/>

              <EditDetail attr='eye_colour' className='col-6' icon='eye'/>

              <EditDetail attr='country' className='col-7' icon='globe'/>

              <EditDetail tagname='input' attr='zip' className='col-5' icon='message' />
            </div>

            <EditDetail attr='about_me' heading='about me' maxLength={2000} />

            <EditDetail attr='seeking' heading='looking for' maxLength={2000} />

          </div>
        </section>
      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(EditHandler)
