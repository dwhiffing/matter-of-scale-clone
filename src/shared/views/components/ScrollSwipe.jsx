import React from 'react'
import Constants from 'shared/utils/Constants'
import ScrollHelper from 'shared/utils/ScrollHelper'
import _ from 'lodash'

/**
 *
 * @class ScrollSwipe
 * This component is currently only used for browse results
 * It takes a child and renders two children on either side of it
 * allowing you to swipe either left or right to perform actions
 **/

let _ePos, _eTime, _timeout, _touching, _triggered = false

const ScrollSwipe = React.createClass({

  getDefaultProps() {
    return {
      index: 0,
      scrollTimeout: 50,
      dragThreshold: 0.1,
      onTap: () => {},
      updateIndex: () => {},
      width: Math.min(window.innerWidth, Constants.maxContainerWidth)
    }
  },

  getInitialState() {
    return {
      triggered: false
    }
  },

  componentDidMount() {
    // set scroll position to center index
    this.setScroll(this.props.width, false)

    // initialize scroll update function
    this.refs.swipeWrap.addEventListener("scroll", this.handleScroll)
  },

  shouldComponentUpdate() {
    return this.props.shouldUpdate
  },

  componentWillUnmount() {
    this.refs.swipeWrap.removeEventListener("scroll", this.handleScroll)
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index || nextProps.width !== this.props.width) {
      let position = nextProps.width * nextProps.index
      this.setScroll(position)
    }
  },

  setScroll(position, shouldTransition=true, duration=400) {
    if (shouldTransition) {
      ScrollHelper.animateLeftScroll(this.refs.swipeWrap, position, {duration: duration})
    } else {
      this.refs.swipeWrap.scrollLeft = position
    }
  },

  getClosestIndex() {
    let position
    let {width, index, dragThreshold} = this.props
    let offsetX = this.refs.swipeWrap ? parseInt(this.refs.swipeWrap.scrollLeft) : 0
    let dist = (offsetX - width*index)/width

    if (Math.abs(dist) > dragThreshold) {
      let dir = dist > 0 ? 1 : -1
      position = width * (index + dir)
    } else {
      position = width * index
    }

    return {position: position, distance: +(dist).toFixed(2)}
  },

  handleTouchStart(e) {
    if (e.touches) _ePos = e.touches[0].screenX
    if (e.timeStamp) _eTime = e.timeStamp
    _touching = true
  },

  handleTouchEnd(e) {
    if (!e.changedTouches) return false

    _touching = false
    let x = e.changedTouches[0].screenX
    let timeRange = 300, distRange = 5

    let releasedInDistanceRange = x-distRange <= _ePos && x+distRange >= _ePos
    let releasedInTimeRange = e.timeStamp <= _eTime + timeRange

    // TODO: find a better way to prevent swipe from taking FavoriteButton click events
    let targetIsFavoriteButton = /favorite/.test(e.target.className)
    if (releasedInDistanceRange && releasedInTimeRange && !targetIsFavoriteButton) {
      this.props.onTap(this.props.index)
    } else if (_timeout === null) {
      this.handleScrollEnd()
    }
  },

  handleScroll(e) {
    this.resetScrollTimeout()
    let closest = this.getClosestIndex()
    // If we hit either end of the index, trigger the update immediately rather than waiting for the scroll to finish
    if (!this.state.triggered && Math.abs(closest.distance) > 0.95) {
      clearTimeout(_timeout)
      let position = closest.position
      this.setState({triggered: true})

      this.props.updateIndex(position/this.props.width)
    }
  },

  handleScrollEnd() {
    if (_touching) {
      this.resetScrollTimeout(null)
      return
    }
      
    // this needs to be able to animate Y pos as well
    let offsetX = this.getClosestIndex().position
    this.setScroll(Math.abs(offsetX))
  },

  resetScrollTimeout(value) {
    value = value || setTimeout(() => this.handleScrollEnd(), this.props.scrollTimeout)
    if (this.props.scrollTimeout !== 0) {
      clearTimeout(_timeout)
      _timeout = value
    }    
  },

  render() {
    return (
      <div
        ref="swipeWrap"
        className={`overflow-scroll-x mx-auto hide-scrollbars ${this.props.className}`}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        style={_.merge({marginBottom: -6}, this.props.style)}>

        <div className={'inline-block'} style={{width: this.props.width}}/>

        {React.cloneElement(this.props.children)}

        <div className={'inline-block'} style={{width: this.props.width}}/>

      </div>
    )
  }
})

export default ScrollSwipe