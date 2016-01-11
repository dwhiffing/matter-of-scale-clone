import React from 'react'
import { changeRoute, replaceRoute } from 'shared/utils/History'
import Header from 'shared/views/interface/Header'
import Icon from 'shared/views/interface/Icon'
import Gallery from 'profiles/views/components/Gallery'
import LoadingScreen from 'shared/views/interface/LoadingScreen'

import InterfaceActions from 'shared/actions/InterfaceActions'
import ViewedProfileActions from 'profiles/actions/ViewedProfileActions'
import PhotoActions from 'profiles/actions/PhotoActions'
import _ from 'lodash'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const stateToConnect = mapState(['photos', 'viewedProfile'])
const actionsToConnect = mapActions([PhotoActions, ViewedProfileActions, InterfaceActions])

/**
 * Generates a Gallery and each photo's caption, as well as a message button
 * @class ViewedPhotosModalHandler
 **/
const ViewedPhotosModalHandler = React.createClass({

  propTypes: {
    /** currently logged in profile */
    currentProfile: React.PropTypes.object,
    /** profile being viewed */
    viewedProfile: React.PropTypes.object,
    /** photos of profile being viewed */
    photos: React.PropTypes.array,
  },

  componentWillMount() {
    if (this.props.currentProfile.login === this.props.params.profile_id) {
      _.defer(() => replaceRoute(`/profiles/edit/photos/${this.props.params.photo_id}`))
    }
  },

  componentDidMount() {
    this.props.fetchViewedProfile(this.props.params.profile_id)
    this.props.fetchPhotos(this.props.params.profile_id)
  },

  headerTitle() {
    let index = +(this.props.params.photo_id)
    let size = this.props.photos.length || '?'
    return `${index} of ${size}`
  },

  render() {
    let { viewedProfile, photos } = this.props
    let index = +(this.props.params.photo_id) - 1

    if (!viewedProfile || !photos) {
      return <LoadingScreen />
    }

    let onUpdate = index => replaceRoute(`/profiles/${viewedProfile.login}/photos/${index+1}`)

    return (
      <section className="bg-black no-ui unlimited hide-nav">
        <Header title={this.headerTitle()} color="bg-fade-down" />

        <Gallery fullscreen index={index} photos={photos} onUpdate={onUpdate} />

        <div className='row between middle absolute to-bottom bg-fade-up'>

          <div className='px2 overflow-hidden ellipsis'>
            {photos[index].caption || ""}
          </div>

          <button className='bg-secondary' onClick={() => changeRoute(`/profiles/${viewedProfile.login}?message=1`)}>
            <Icon name='message'/>
          </button>

        </div>

      </section>
    )
  }
})

export default connect(stateToConnect,actionsToConnect)(ViewedPhotosModalHandler)
