import React from 'react'
import Icon from 'shared/views/interface/Icon'
import request from 'shared/utils/APIUtils'
import cx from 'classnames'

export default React.createClass({

  getDefaultProps() {
    return {
      onChange: () => {}
    }
  },

  getInitialState() {
    return {
      isGPSActive: false,
      isGPSCapturing: false
    }
  },

  logError(error) {
    this.setState({ isGPSActive: false, isGPSCapturing: false })
    console.log(`Error: ${error}`)
  },

  startGeolocation(e) {
    this.setState({ isGPSCapturing: true, isGPSActive: false })
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = `${position.coords.latitude}, ${position.coords.longitude}`
      request.junto_api.post('/geo/reverse_geocode').send({ coords}).then((res) => {
        this.setState({isGPSActive: true, isGPSCapturing: false})
        let geo = JSON.parse(res.text).geo_result
        this.props.onChange(`${geo.city}, ${geo.state}`)
      })
    }, this.logError)
  },

  render() {
    let classes = cx('flex-last location-input', {
      'activated': this.state.isGPSActive,
      'capturing': this.state.isGPSCapturing
    })

    return (
      <div className={classes}>
        <button className="geolocate-button" onTouchEnd={this.startGeolocation}>
          <div className="arrow-holder">
            <Icon name="direction" />
          </div>
        </button>
      </div>
    )
  }
})
