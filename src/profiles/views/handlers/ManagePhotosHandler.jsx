import React from 'react'
import _ from 'lodash'
import { changeRoute } from 'shared/utils/History'
import ImageUpload from 'shared/views/form/ImageUpload'
import Square from 'shared/views/components/Square'
import LoadingScreen from 'shared/views/interface/LoadingScreen'
import { Header, WideHeading, Icon } from 'shared/views/interface'
import PhotoActions from 'profiles/actions/PhotoActions'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

const stateToConnect = mapState(['photos'])
const actionsToConnect = mapActions([PhotoActions])

let _file

const PhotoUpload = ({onUpload, label, uploadPrivate}) => {
  return (
    <Square className="col-4 bg-white color-white" imageClass="bg-secondary width-100">
      <div className={`absolute-fill row middle center`}>
        <ImageUpload
          className='absolute-fill'
          onUploadImage={onUpload}
          uploadPrivate={uploadPrivate}
          style={{fontSize: 0, opacity: '0.01', height: 'auto'}}>
        </ImageUpload>
        <div>
          <Icon style={{fontSize: '2.8rem'}} name="camera"/>
          <h2 className="mt2">
            {label}
          </h2>
        </div>
      </div>
    </Square>
  )
}

/**
 * Generates a list of the currentProfile's photos and accompanying interface to reorder/update them
 * @class ManagePhotosHandler
 **/
const ManagePhotosHandler = React.createClass({

  propTypes: {
    /** currently logged in profile */
    currentProfile: React.PropTypes.object,
    /** contains public photos of the viewed profile */
    publicPhotos: React.PropTypes.array,
    /** contains private photos of the viewed profile */
    privatePhotos: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      photos: []
    }
  },

  componentDidMount() {
    this.props.fetchPhotos(this.props.currentProfile.login)
  },

  headerTitle() {
    return "Manage Photos"
  },

  tryUpload() {
    const { currentProfile, photos } = this.props
    const maxPhotos = currentProfile.max_photos || 5
    if (photos.length >= maxPhotos) {
        this.props.displayFlashMessage("Photo limit reached")
    } else {
      this.props.uploadPhoto(...arguments)
    }
  },

  render() {
    let {photos, currentProfile, uploadPhoto} = this.props

    if (!photos || !currentProfile) {
      return <LoadingScreen />
    }


    const generatePhoto = (item, index) => {
      return (
        <div key={`photo-${index}`} className='col-4'>
          <img
            src={item.medium}
            onClick={() => changeRoute(`/profiles/edit/photos/${item.position + 1}`)}>
          </img>
        </div>
      )
    }

    return (
      <div>
        <Header title={this.headerTitle()} />
        <section>

          <WideHeading>
            PUBLIC PHOTOS
          </WideHeading>

          <div className="photo row">
            {photos.filter(p => !p.private).map(generatePhoto)}

            <PhotoUpload label="Add Public" onUpload={this.tryUpload} />
          </div>

          <WideHeading>
            PRIVATE PHOTOS
          </WideHeading>

          <div className="photo row">
            {photos.filter(p => p.private).map(generatePhoto)}

            <PhotoUpload label="Add Private" onUpload={this.tryUpload} uploadPrivate />
          </div>

        </section>
      </div>
    )
  }

})

export default connect(stateToConnect, actionsToConnect)(ManagePhotosHandler)
