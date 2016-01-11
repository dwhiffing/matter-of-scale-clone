import React from 'react'
import cx from "classnames"
import Icon from 'shared/views/interface/Icon'
import SettingRow from 'shared/views/form/SettingRow'
import Checkbox from 'shared/views/form/Checkbox'

export default React.createClass({
  
  propTypes: {
    values: React.PropTypes.array.isRequired,
    value: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      values: [],
      value: []
    }
  },

  onChange(select, newValues) {
    if (select.checked) {
      newValues = this.props.value.concat([select.name])
    } else {
      newValues = this.props.value.filter(v => v != select.name)
    }
    this.props.onChange(newValues)
  },

  _renderItem(value) {
    let isSelected = this.props.value.indexOf(value) >= 0

    return (
      <SettingRow label={value} key={value} clickChild>
        <Checkbox className="right h3 py1" name={value} value={isSelected} onChange={this.onChange}/>
      </SettingRow>
    )
  },

  render() {
    return (
      <div>
        {this.props.values.map(v => this._renderItem(v))}
      </div>
    )
  }
})
