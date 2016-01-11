import React from 'react'
import ReactDOM from 'react-dom'
import ImageLoader from 'shared/views/components/ImageLoader'
import _ from 'lodash'
import cx from 'classnames'

const CroppedPhoto = React.createClass({

  propTypes: {
    /** image src to load */
    src: React.PropTypes.string.isRequired,
    /** image to use if src fails to load */
    defaultImage: React.PropTypes.string,
    /** used to style wrapper */
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    /** used to style wrapper */
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    /** allows for ratio based vertical crop */
    cropRatio: React.PropTypes.number,
    /** should image get cut off to fill parent */
    fillWrapper: React.PropTypes.bool,
    /** render black square for performance */
    isDummy: React.PropTypes.bool,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      defaultImage: 'thumb_f.jpg',
      width: '100vw',
      height: '100vh',
      style: {}
    }
  },

  getInitialState() {
    return {
      /** has the image failed to load */
      failed: false,
      /** has the image succeeded in loading */
      loaded: false,
      /** the computed width of the parent node */
      wrapperWidth: 0,
      /** the computed height of the parent node */
      wrapperHeight: 0,
      /** the width of the loaded image */
      srcWidth: 0,
      /** the height of the loaded image */
      srcHeight: 0
    }
  },

  componentDidMount() {
    this.setWrapperDimensions()
  },

  componentWillReceiveProps(nextProps) {
    this.setWrapperDimensions(nextProps)
  },

  setWrapperDimensions(props) {
    props = props || this.props
    if (!this.refs.wrapper) return
    let {width, height} = this.state
    let node = ReactDOM.findDOMNode(this.refs.wrapper)
    let wrapperWidth = typeof props.width == 'number' ? props.width : node.clientWidth
    let wrapperHeight = typeof props.height == 'number' ? props.height : node.clientHeight
    let change = wrapperWidth != width || wrapperHeight != height

    if (node && change) {
      this.setState({
        wrapperWidth: wrapperWidth,
        wrapperHeight: wrapperHeight
      })
    }
  },

  imageLoaded({target}) {
    this.setState({
      srcWidth: target.width,
      srcHeight: target.height,
      loaded: true
    })
  },

  imageFailed(e) {
    if (!this.state.failed) {
      this.setState({failed: true, loaded: true})
      e.target.src = `/javascripts/foster/images/${this.props.defaultImage}`
    }
  },

  getFillDirection() {
    let {wrapperWidth, wrapperHeight, srcHeight, srcWidth} = this.state

    if (this.props.cropRatio) {
      if (wrapperHeight > wrapperWidth * this.props.cropRatio) {
        wrapperHeight = wrapperWidth * this.props.cropRatio
      }

      const landscape = srcWidth > srcHeight
      const wrapRatio = wrapperHeight / wrapperWidth
      const imgRatio = landscape ? srcHeight/srcWidth : srcWidth/srcHeight

      return srcWidth > srcHeight && imgRatio < wrapRatio ? {height: wrapperHeight} : {width: wrapperWidth}
    }

    let taller = wrapperWidth * (srcHeight/srcWidth) > wrapperHeight
    let wider = wrapperHeight * (srcWidth/srcHeight) > wrapperWidth
    let fitHeight = !wider && (wrapperWidth > wrapperHeight || taller)

    if (this.props.fillWrapper) {
      fitHeight = !fitHeight
    }

    return fitHeight ? {height: wrapperHeight} : {width: wrapperWidth}
  },

  render() {
    let { width, height, style } = this.props
    let wrapperClass = cx( "overflow-hidden inline-block", this.props.className, {
      'bg-black': this.props.isDummy
    })

    if (this.state.wrapperWidth && this.props.cropRatio) {
      style.maxHeight = this.state.wrapperWidth * this.props.cropRatio
    }

    let wrapperStyle = _.merge({
      width: width === '100vw' ? width : width,
      height: height === '100vh' ? height : height,
      verticalAlign: 'top'
    }, style)

    let marginTop = 0
    if (this.props.cropRatio && this.state.srcHeight && this.state.srcWidth) {
      marginTop = Math.max(0, (this.state.srcHeight / this.state.srcWidth - 1) * 100)
    }

    let imgProps = {
      className: 'image-center',
      style: Object.assign({}, this.getFillDirection(), {
        marginTop: marginTop
      })
    }

    let src = this.props.src
    if (/https/.test(location.origin)) {
      src = /https/.test(src) ? src : src.replace('http','https')
    } else {
      src = /https/.test(src) ? src.replace('https','http') : src
    }

    return (
      <ImageLoader ref="wrapper"
        className={wrapperClass}
        style={wrapperStyle}
        imgProps={imgProps}
        onLoad={this.imageLoaded}
        onError={this.imageFailed}
        src={this.props.isDummy ? '' : src}>
      </ImageLoader>
    )
  }
})

export default CroppedPhoto
