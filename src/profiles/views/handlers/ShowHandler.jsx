import React from 'react'
import ReactDOM from 'react-dom'
import { changeRoute, replaceRoute } from 'shared/utils/History'

import ProfileShowOptions from 'profiles/views/components/ProfileShowOptions'
import ProfileSummary from 'profiles/views/components/ProfileSummary'
import { WideHeading, LoadingScreen, Header, Icon } from 'shared/views/interface'
import ComposeBox from 'inbox/views/components/ComposeBox'
import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'
import _ from 'lodash'

import ViewedProfileActions from 'profiles/actions/ViewedProfileActions'
import PhotoActions from 'profiles/actions/PhotoActions'
import InterfaceActions from 'shared/actions/InterfaceActions'
import InboxActions from 'inbox/actions/InboxActions'

const stateToConnect = mapState(['photos', 'viewedProfile'])
const actionsToConnect = mapActions([PhotoActions, ViewedProfileActions, InterfaceActions, InboxActions])

const ProfileDetail = ({condition, className, heading, children}) => {
  if (!condition) return <div/>
  return (
    <div className={className}>
      {heading && <WideHeading>{heading}</WideHeading>}
      {children}
    </div>
  )
}

/**
 * Displays various info about the current ViewedProfile
 * TODO: need to reimplement message box
 *
 * @class ShowHandler
 **/
export const ShowHandler = React.createClass({

  propTypes: {
    /** currently logged in profile */
    currentProfile: React.PropTypes.object,
    /** profile being viewed */
    viewedProfile: React.PropTypes.object,
    /** photos of profile being viewed */
    photos: React.PropTypes.array,
  },

  componentWillMount() {
    let { viewedProfile, currentProfile, params } = this.props
    if (currentProfile.login !== params.profile_id) {
      this.props.fetchViewedProfile(params.profile_id)
      this.props.fetchPhotos(params.profile_id)
    } else {
      _.defer(() => replaceRoute(`/profiles/edit`))
    }
  },

  componentDidMount() {
    window.scrollTop = 0
  },

  headerTitle() {
    return "Search"
  },

  headerAccessory() {
    let onClick = () => {
      this.props.toggleModalMenu(true)
    }
    return <span onClick={onClick}>Options</span>
  },

  render() {
    let {viewedProfile, photos, userInterface, toggleModalMenu, params} = this.props
    if (!viewedProfile || !photos || params.profile_id !== viewedProfile.login) {
      return <LoadingScreen />
    }

    let {preference, extension} = viewedProfile
    return (
      <div>
        <Header title={this.headerTitle()} rightAccessory={this.headerAccessory()} />

        <section className="hide-nav">

          <ProfileShowOptions
            profile={viewedProfile}
            show={userInterface.modalMenuShown}
            toggle={toggleModalMenu}>
          </ProfileShowOptions>

          <ProfileSummary
            profile={viewedProfile}
            photos={photos}>
          </ProfileSummary>

          <div className="profile-details">

            <ProfileDetail condition={extension.tagline} className="tagline">
              <Icon name="quote-left" />
              <p>{extension.tagline}</p>
            </ProfileDetail>

            <WideHeading>
              BASICS
            </WideHeading>
            <div className='basics row between'>
              <span className='col-6 ellipsis'>
                <Icon name='calendar'/>{preference.zodiak}
              </span>
              <span className='col-5 ellipsis'>
                <Icon name='resize-vertical'/>{preference.height_pretty}
              </span>
              <span className='col-6 ellipsis'>
                <Icon name='globe'/>{preference.ethnicity}
              </span>
              <span className='col-5 ellipsis'>
                <Icon name='male'/>{preference.body_type}
              </span>
              <span className='col-6 ellipsis'>
                <Icon name='hair'/>{preference.hair_colour}
              </span>
              <span className='col-5 ellipsis'>
                <Icon name='eye'/>{preference.eye_colour}
              </span>
            </div>

            <ProfileDetail heading='about me' condition={extension.about_me}>
              <p>{extension.about_me}</p>
            </ProfileDetail>

            <ProfileDetail heading='looking for' condition={extension.seeking}>
              <p>{extension.seeking}</p>
            </ProfileDetail>

            <ProfileDetail heading='gifts' condition={viewedProfile.gift_sets.length > 0}>
              <div className='row'>
                {viewedProfile.gift_sets.map((set, i) => {
                  return (
                    <div key={`gift-${i}`} className='col-4'>
                      <img src={set.gift.medium} />
                    </div>
                  )
                })}
              </div>
            </ProfileDetail>

            <ComposeBox
              autoFocus={this.props.location.query.message}
              currentProfile={this.props.currentProfile}
              established={viewedProfile.conversation_established}
              photo={photos[0].medium}
            />

          </div>
        </section>
      </div>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(ShowHandler)
