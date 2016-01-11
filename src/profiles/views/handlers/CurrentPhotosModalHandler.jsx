import React from 'react'
import { changeRoute, replaceRoute } from 'shared/utils/History'
import { Header, LoadingScreen, WideHeading, Icon } from 'shared/views/interface'
import Gallery from 'profiles/views/components/Gallery'
import Input from 'shared/views/form/Input'
import cx from 'classnames'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

import PhotoActions from 'profiles/actions/PhotoActions'
import ViewedProfileActions from 'profiles/actions/ViewedProfileActions'
import CurrentProfileActions from 'profiles/actions/CurrentProfileActions'

let _currentPhoto

/**
 * Manages the UI for updating photos
 * TODO: handle photo limit
 * TODO: prevent moving of moderated photos
 * @class PhotoActionSheet
 **/
export const PhotoActionSheet = ({photos, photo, updatePhoto, deletePhoto, autoFocus}) => {
  const baseClasses = "col-12 left-align regular bg-gray-20 b-gray-10 p2 h3"
  const isProfilePhoto = _currentPhoto.position < 1 && !_currentPhoto.private
  const isPrivate = _currentPhoto.private
  const forcedPrivateByAdmin = photo.moderation[0] === 'p'
  const moderationClasses = forcedPrivateByAdmin ? 'gray-50' : 'color-white'

  const classNames = (active) => active ? `${baseClasses} active` : baseClasses

  const actions = {
    profile: () => updatePhoto(_currentPhoto.id, {position: -1, private: false}),
    public: () => updatePhoto(_currentPhoto.id, {private: false}),
    private: () => updatePhoto(_currentPhoto.id, {private: true}),
    caption: (caption) => updatePhoto(_currentPhoto.id, {caption: caption}),
    delete: () => deletePhoto(_currentPhoto.id),
  }

  const disableProfileButton = isProfilePhoto || forcedPrivateByAdmin
  const disablePublicButton = !isPrivate || forcedPrivateByAdmin
  const disablePrivateButton = isPrivate

  return (
    <div className="absolute to-bottom">

      <Input
        autoFocus={autoFocus}
        tagname="input"
        inputClassName='m0 p2 gray-90 regular h3 bg-gray-10 gray-20 col-12'
        onChange={value => actions.caption(value)}
        debounceTime={500}
        placeholder={"Tap to add a caption"}
        value={_currentPhoto.caption || ''}>
      </Input>

      <div className="row" style={{height: 190, overflowX: 'scroll'}}>

        <WideHeading dark className="col-12">
          Photo Privacy
        </WideHeading>

        <button className={`${classNames(isProfilePhoto)} ${moderationClasses}`} onClick={disableProfileButton ? () => {} : actions.profile}>
          <Icon name='ok'/> Make profile photo
        </button>

        <button className={`${classNames(!isPrivate)} ${moderationClasses}`} onClick={disablePublicButton ? () => {} : actions.public}>
          <Icon name='ok'/> Make photo public
        </button>

        <button className={classNames(isPrivate)} onClick={disablePrivateButton ? () => {} : actions.private}>
          <Icon name='ok'/> Make photo private
        </button>

        <WideHeading dark className="col-12">
          More
        </WideHeading>

        <button className={classNames(false)} onClick={actions.delete}>
          <Icon name='ok'/> Delete Photo
        </button>

      </div>
    </div>
  )
}

/**
 * Generates a Gallery and Accompanying interface to update Photo status for each
 *
 * TODO: should take photo limit into account
 * TODO: should prevent making moderated photos public when private (dick pics.etc)
 * @class CurrentProfilePhotoModalHandler
 **/
const stateToConnect = mapState(['photos', 'viewedProfile'])
const actionsToConnect = mapActions([PhotoActions, ViewedProfileActions, CurrentProfileActions])
const CurrentPhotosModalHandler = React.createClass({

  propTypes: {
    /** currently logged in profile */
    currentProfile: React.PropTypes.object,
    /** photos of profile being viewed */
    photos: React.PropTypes.array,
  },

  getInitialState() {
    return {
      editMode: false,
      autoFocus: false
    }
  },

  componentWillMount() {
    this.props.fetchPhotos(this.props.currentProfile.login)
  },

  componentWillUpdate(nextProps) {
    let index = nextProps.params.photo_id
    if (nextProps.photos && nextProps.photos.length === 0) {
      replaceRoute('/profiles/edit/photos')
      return false
    }
    if (nextProps.photos && index <= 0) {
      replaceRoute('/profiles/edit/photos/1')
      return false
    }
    if (nextProps.photos && index > nextProps.photos.length) {
      replaceRoute(`/profiles/edit/photos/${nextProps.photos.length}`)
      return false
    }
  },

  toggleMode(autoFocus) {
    this.setState({
      editMode: !this.state.editMode,
      autoFocus: !!autoFocus
    })
  },

  headerTitle() {
    const {params, photos} = this.props
    return `${params.photo_id} of ${photos.length}`
  },

  headerAccessory() {
    return (
      <span onClick={() => this.toggleMode()}>
        {this.state.editMode ? "Done" : "Edit"}
      </span>
    )
  },

  render() {
    const { photos, updatePhoto, deletePhoto, fetchCurrentProfile, currentProfile } = this.props
    const index = this.props.params.photo_id - 1

    if (!photos || !photos[index]) {
      return <LoadingScreen />
    }

    _currentPhoto = photos[index]
    let height = this.state.editMode ? 190 : 0
    let caption = _currentPhoto.caption !== '' ? _currentPhoto.caption : 'Tap to add caption'

    return (
      <section className="photo-manager bg-black fixed unlimited hide-nav">

        <Header title={this.headerTitle()} rightAccessory={this.headerAccessory()} color="bg-fade-down" />

        <Gallery fullscreen
          index={index}
          photos={photos}
          profile={currentProfile}
          subtractHeight={height}
          onClick={() => this.toggleMode()}
          onUpdate={i => replaceRoute(`/profiles/edit/photos/${i+1}`)}>
        </Gallery>

        <div
          onClick={() => this.toggleMode(true)}
          className={`absolute to-bottom m0 p2 regular h3 bg-fade-up gray-${_currentPhoto.caption == '' ? '50' : '90'}`}>
          {caption}
        </div>

        {this.state.editMode &&
          <PhotoActionSheet
            photo={_currentPhoto}
            updatePhoto={updatePhoto}
            deletePhoto={deletePhoto}
            autoFocus={this.state.autoFocus}
            />
        }

      </section>
    )
  }
})

export default connect(stateToConnect, actionsToConnect)(CurrentPhotosModalHandler)
