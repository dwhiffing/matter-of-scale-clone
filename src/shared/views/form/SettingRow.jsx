import React from "react"
import { changeRoute } from 'shared/utils/History'
import cx from "classnames"
import Icon from "shared/views/interface/Icon"

let _touch = {y: 0, dist: 0}

export default React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    link: React.PropTypes.string,
    header: React.PropTypes.string,
    icon: React.PropTypes.string,
    secondaryHeader: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    showArrow: React.PropTypes.bool
  },

  defaultProps: {
    label: '',
    className: '',
    showArrow: false
  },

  getInitialState() {
    return {
      touched: false
    }
  },

  touchStart(e) {
    _touch.y = e.touches[0].screenY
    this.setState({ touched: true })
  },

  touchEnd(e) {
    this.setState({ touched: false })

    if (_touch.dist < 6) {
      if (this.props.link) {
        changeRoute(this.props.link)
      } else if (this.props.onClick) {
        this.props.onClick()
      } else if (this.props.clickChild){
        this.refs.holder.children[0].click()
        e.preventDefault()
      }
    }

    _touch = {y: 0, dist: 0}
  },

  touchMove(e) {
    _touch.dist = Math.abs(_touch.y - e.touches[0].screenY)
  },

  render() {
    let {header, secondaryHeader, className, label, link, showArrow, icon} = this.props
    let arrowIcon, iconLabelJSX

    if (header) {
      if (secondaryHeader) {
        secondaryHeader = <span> : <span className="gray-40">{secondaryHeader}</span></span>
      }

      header = (
        <h5 className="caps gray-60 absolute t-0 l-0" style={{padding: '0.6rem 1rem'}}>
          {header}{secondaryHeader}
        </h5>
      )
    }

    if (link || showArrow) {
      arrowIcon = <Icon className="right" name="right-open"/>
    }

    if (icon) {
      icon = <span><Icon name={icon}/>&nbsp;&nbsp;</span>
    }

    if (icon || label) {
      iconLabelJSX = (
        <h3>
          {icon}{label}
        </h3>
      )
    }

    return (
      <div
        className={`row middle between px3 gray-50 relative`}
        style={{borderBottom: 'solid 1px #e6e6e6', minHeight: 55}}
        onTouchStartCapture={this.touchStart}
        onTouchMoveCapture={this.touchMove}
        onTouchEndCapture={this.touchEnd}>

        {header}

        {iconLabelJSX}

        <div className={`${className}`} ref="holder">
          {this.props.children}
        </div>

        {arrowIcon}

      </div>
    )
  }
})
