import React from 'react'
import Icon from 'shared/views/interface/Icon'
import Slider from 'shared/views/form/Slider'

export default React.createClass({

  propTypes: {
    values: React.PropTypes.array,
    value: React.PropTypes.array,
    onChange: React.PropTypes.func
  },

  shouldComponentUpdate(nextProps) {
    return this.props.value[0] !== nextProps.value[0] || this.props.value[1] !== nextProps.value[1]
  },

  onChange(v) {
    if (v.constructor !== Array) {
      v = [v]
    }
    this.forceUpdate()
    this.props.onChange(v)
  },

  render() {
    let {values, icon} = this.props
    let iconSmall = <span className="col-1 p1 gray-B"><Icon name={icon}/></span>
    let iconLarge = <span className="col-1 px1 h2 gray-B"><Icon name={icon}/></span>
    return (
      <div className="row middle between">
        {iconSmall}
        <div className={`unit-slider col-10 unit-slider-${this.props.value.length}`}>
          <Slider
            withBars
            min={values[0]}
            max={values[1]}
            step={values[2]}
            value={this.props.value}
            onChange={this.onChange}
            minDistance={3}
          />
        </div>
        {iconLarge}
      </div>
    )
  }
})
