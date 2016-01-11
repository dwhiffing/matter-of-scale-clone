import React from 'react'
import cx from 'classnames'

const OptionsMenu =  React.createClass({

  propTypes: {
    buttons: React.PropTypes.array,
    page: React.PropTypes.number,
    cancelCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      buttons: [],
      page: 0,
      cancelCallback: null
    }
  },

  getInitialState: function() {
    return {
      page: this.props.page
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      page: nextProps.page
    })
  },

  generateItem(item){
    return (
      <h3
        key={arguments[1]}
        className={`button action ${item.className ? item.className : ''}`}
        onClick={ (e) => {
          item.action()
          e.stopPropagation()
        }}>
        {item.label}
      </h3>
    )
  },

  handleCancel(e) {
    e.preventDefault()

    this.props.toggle(false)

    if (this.props.cancelCallback) {
      this.props.cancelCallback(e)
    }
  },

  render() {
    if (this.props.buttons.length < 1) {
      return null
    }

    let classes = cx('options-overlay', {
      'show': this.props.show
    })

    let buttons = this.props.buttons.map((buttons) => {
      return buttons.filter(b => b)
    })

    return (
      <div className={classes} onClick={this.handleCancel}>
        <div className='button-wrap'>
          {buttons[this.state.page].map(this.generateItem)}
          <button className="button cancel" onClick={this.handleCancel}>Cancel</button>
        </div>
      </div>
    )
  }
})

export default OptionsMenu
