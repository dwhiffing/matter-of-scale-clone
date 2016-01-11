import Constants from 'shared/utils/Constants'
import React from 'react'
import ResizeMixin from 'shared/views/mixins/ResizeMixin'
import TransformSwipe from 'shared/views/components/TransformSwipe'
import CroppedPhoto from 'profiles/views/components/CroppedPhoto'
import _ from 'lodash'

/**
 * Generates a swiping row of inline photos cropped based on props.
 * This component renders a list of "Image" components inside of a Swipe component.
 * It can also display photos fullscreen with captions.
 * It takes the following props:
 * * width/height - the size each image should fit.
 * * cropRatio - the ratio of the height to the width. if provided, the image will be cropped vertically to fit
 * * photos - a list of photos that have a 'large' attr which should be the src
 * * modal - whether gallery should be fullscreen or not
 *
 * @class Gallery
 **/
const Gallery = React.createClass({

  mixins: [ResizeMixin],

  propTypes: {
    profile: React.PropTypes.object,
    photos: React.PropTypes.arrayOf(React.PropTypes.object),
    fullscreen: React.PropTypes.bool,
    cropRatio: React.PropTypes.number,
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    index: React.PropTypes.number
  },

  getInitialState() {
    return {
      index: this.props.index,
      width: Math.min(innerWidth, Constants.maxContainerWidth),
      height: innerHeight
    }
  },

  getDefaultProps() {
    return {
      index: 0,
      modalTap: false,
      maxWidth: Infinity,
      subtractHeight: 0,
      fullscreen: false,
      isCurrent: false
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.state.index) {
      this.setState({index: nextProps.index})
    }
  },

  updateIndex(index) {
    if ((Number(index) === index && index % 1 === 0)) {
      if (this.props.onUpdate) {
        _.delay(() => this.props.onUpdate(index), 350)
      }
      this.setState({index})
    }
  },

  onTap() {
    if (this.props.onTap) {
      _.defer(() => {
        this.props.onTap(this.state.index)
      })
    }
  },

  render() {
    let width = this.props.width || this.state.width
    let height = this.props.height || this.state.height

    height -= this.props.subtractHeight

    return (
      <div className="overflow-hidden">
        <TransformSwipe
          index={this.state.index}
          updateIndex={this.updateIndex}
          numElements={this.props.photos.length}
          onTap={this.onTap}>

          <div className="clearfix mx-auto bg-black no-wrap">
            {this.props.photos.map((img, i) => {
              return (
                <CroppedPhoto
                  key={`photo-${i}`} src={img.large}
                  style={Object.assign({maxWidth: width}, this.props.style)}
                  width={width}
                  height={height}
                  cropRatio={this.props.cropRatio}>
                </CroppedPhoto>
              )
            })}
          </div>

        </TransformSwipe>
      </div>
    )
  }
})

export default Gallery
