import React from 'react'
import Icon from 'shared/views/interface/Icon'

export default React.createClass({

  getInitialState() {
    return {
      display: false
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.display) {
      this.setState({display: true})
    }
  },

  onClose() {
    this.props.closeModal()
    this.setState({display: false})
  },

  render() {
    if (!this.state.display) return false

    return (
      <div className={'modal fixed absolute-fill color-white'} style={{zIndex: 20, backgroundColor: 'rgba(0,0,0,0.85)'}}>
        <Icon name="cancel" className="absolute t-0 r-0 p3 h2" onClick={this.onClose}/>
        {this.props.children}
      </div>
    )
  }
})
