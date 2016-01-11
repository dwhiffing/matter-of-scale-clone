import React from 'react'
import cx from 'classnames'
import Icon from 'shared/views/interface/Icon'

export default React.createClass({
  
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.bool,
  },
  
  getDefaultProps() {
    return {
      name: '',
      value: false,
    }
  },

  render() {
    let {value, name, onChange} = this.props
    
    let classes = cx(`checker ${this.props.className}`, {
      value: value
    })
    
    let icon = value ? (<Icon name="ok" />) : null

    return (
      <div
        className={classes}
        onClick={() => onChange({name, checked: !value})}>

        {icon}

      </div>
    )
  }
})
