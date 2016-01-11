import React from 'react'

export default React.createClass({
  
  propTypes: {
    value: React.PropTypes.string,
    values: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  render() {
    let {value, values, onChange} = this.props
    return (
      <select value={value}
        className={`bg-clear ${this.props.className}`}
        onChange={(e) => onChange(e.target.value)}>

          {Object.keys(values).map((v, i) => {
            return (
              <option key={`option-${v}`} value={v}>
                {values[v]}
              </option>
            )
          })}

      </select>
    )
  }
})
