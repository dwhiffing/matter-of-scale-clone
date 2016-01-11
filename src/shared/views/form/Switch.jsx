import React from 'react'

export default React.createClass({
  
  propTypes: {
    value: React.PropTypes.bool,
  },

  render() {
    let {value, onChange} = this.props
    return (
      <div className={`switch right ${value ? 'on' : 'off'}`} onClick={() => onChange(!value)}>
        <div className="knob"></div>
      </div>
    )
  }
})
