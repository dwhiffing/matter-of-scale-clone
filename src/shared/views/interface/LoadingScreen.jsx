import React from 'react'
import Icon from 'shared/views/interface/Icon'
import Header from 'shared/views/interface/Header'
import cx from 'classnames'

const LoadingScreen = React.createClass({

  getDefaultProps() {
    return {
      fillParent: false,
      noHeader: false,
      hideLoader: false,
    }
  },

  render() {
    let {fillParent, small, header, className} = this.props

    let classes = cx('row col center middle bg-white', className, {
      flex: fillParent,
      h3: small,
      h1: !small
    })

    let style = {
      height: fillParent ? null : (innerHeight-110)
    }

    return (
      <div className={classes} style={style}>
        {!this.props.noHeader &&
          <Header/>
        }
        {!this.props.hideLoader &&
          <Icon name="spin4" />
        }
      </div>
    )
  }
})

export default LoadingScreen
