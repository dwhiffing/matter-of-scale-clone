import React from 'react'
import Icon from 'shared/views/interface/Icon'
import { changeRoute } from 'shared/utils/History'

const SectionHeading = React.createClass({

  render() {
    let colors = this.props.dark ? 'dark' : ''
    let onClick = () => {
      if (this.props.onClick) {
        this.props.onClick()
      }
      if (this.props.linkTo) {
        changeRoute(this.props.linkTo)
      }
    }
    if (!this.props.children || this.props.children === '') return
    return (
      <h4
        onClick={onClick}
        className={`wide-heading relative caps ${colors} ${this.props.className}`}>

        {this.props.children}
        {this.props.linkTo &&
          <Icon name='right-open' style={{float: 'right', marginRight: -10, color: '#ADADAD'}}/>
        }
      </h4>
    )
  }
});

export default SectionHeading
