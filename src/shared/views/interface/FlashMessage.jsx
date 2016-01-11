import React from 'react'
import CookieManager from 'shared/utils/CookieManager'
import Icon from 'shared/views/interface/Icon'
import cx from 'classnames'

import { connect } from 'react-redux'
import { mapState, mapActions } from 'shared/redux/helpers'

import InterfaceActions from 'shared/actions/InterfaceActions'

const stateToConnect = mapState(['userInterface'])
const actionsToConnect = mapActions([InterfaceActions])

/**
 * A React component that renders user message.
 *
 * @class FlashMessage
 **/
const FlashMessage = React.createClass({

  getDefaultProps() {
    return {
      displayTime: 4000
    }
  },

  getInitialState() {
    return {
      message: null,
      display: false
    }
  },

  componentWillReceiveProps(nextProps) {
    const message = nextProps.userInterface.flashMessage
    if (message && this.state.message == null) {
      this.setState({
        message: message,
        display: true
      })
      setTimeout(this.hideMessage, this.props.displayTime)
    }
  },

  hideMessage() {
    this.setState({
      display: false
    })
    setTimeout(this.clearMessage, 500)
  },

  clearMessage() {
    this.setState({
      message: null
    })
    this.props.clearFlashMessage()
  },

  render() {
    return (
      <div className={cx('flash-message fixed to-top', {
        show: this.state.display
      })}>
        {this.state.message || ""}
      </div>
    )
  }

})

export default connect(stateToConnect, actionsToConnect)(FlashMessage)
