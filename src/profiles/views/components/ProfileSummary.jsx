import React from 'react'
import { changeRoute } from 'shared/utils/History'
import Gallery from 'profiles/views/components/Gallery'
import FavoriteButton from 'profiles/views/components/FavoriteButton'
import Constants from 'shared/utils/Constants'
import ProfileFooter from 'profiles/views/components/ProfileFooter'

// BUG: prevents scrolling when touch starts on it

const ProfileSummary = React.createClass({

  propTypes: {
    /** profile to display */
    profile: React.PropTypes.object.isRequired,
    /** photos to display */
    photos: React.PropTypes.array.isRequired,
    /** is this being displayed for the current user */
    isCurrent: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      isCurrent: false
    }
  },

  render() {
    let { profile, photos, isCurrent } = this.props
    let useDefaultPhoto = photos.length === 0 || photos.filter( p => !p.private).length === 0
    let backgroundColor = useDefaultPhoto ? "#F1F0F0" : '#000'

    let type = isCurrent ? 'edit' : profile.login
    let onTap = index => changeRoute(`/profiles/${type}/photos/${index+1}`)

    let favoriteButtonJSX

    if (!isCurrent) {
      favoriteButtonJSX = <FavoriteButton profile={profile.id} />
    }

    let galleryJSX

    if (useDefaultPhoto) {
      galleryJSX = (
        <img
          className="block mx-auto"
          style={{width: 220}}
          src={`/javascripts/foster/images/thumb_${profile.gender[0]}.jpg`}>
        </img>
      )
    } else {
      galleryJSX = (
        <Gallery
          onTap={onTap}
          cropRatio={.65}
          maxWidth={Constants.maxContainerWidth}
          profile={profile}
          photos={photos}>
        </Gallery>
      )
    }

    const publicPhotoCount = photos.filter(p => !p.private).length
    const privatePhotoCount = photos.filter(p => p.private).length

    return (
      <div className="relative" style={{backgroundColor}}>

        {favoriteButtonJSX}

        {galleryJSX}

        <ProfileFooter profile={profile} />

      </div>
    )
  }
})

export default ProfileSummary
