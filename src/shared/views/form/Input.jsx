import Icon from 'shared/views/interface/Icon'
import React from 'react'
import ProfileUtils from 'profiles/utils/ProfileUtils'
import cx from 'classnames'
import WideHeading from 'shared/views/interface/WideHeading'
import _ from 'lodash'

// TODO: Take inspiration from react-bootstrap to expand and improve this class
// ie: give user notice of update success/failure.etc

const Input = React.createClass({

  getDefaultProps(){
    return {
      name: '',
      attr: '',
      value: '',
      className: '',
      maxLength: null,
      options: null,
      autoFocus: false,
      debounceTime: 1000,
      heading: false,
      tagname: 'textarea',
      icon: null,
      placeholder: 'Tap here to edit',
      adjustHeight: false,
      maxHeight: 100,
      onChange: () => {},
      onClick: () => {},
      onFocus: () => {},
      validate: () => true,
    }
  },

  getInitialState() {
    this.debouncedOnChange = _.debounce(this.props.onChange, this.props.debounceTime)
    return {
      value: this.props.value
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({value: nextProps.value})
    }
  },

  onChange(e) {
    let value = e.target.value

    if (value !== this.state.value && this.lengthValid(value.length) && this.props.validate(value)) {
      this.setState({value})
      this.debouncedOnChange(value)
    } else {
      e.target.value = this.state.value
    }
  },

  lengthValid(length) {
    if (!this.props.maxLength) return true
    return length <= this.props.maxLength
  },

  remaining() {
    return this.state.value ? this.props.maxLength - this.state.value.length : this.props.maxLength
  },

  render() {
    let type = '', remainingJSX, headingJSX, minMax
    let {tagname, icon, attr, heading} = this.props

    let Tag = this.props.tagname

    if (this.props.maxLength && this.remaining() <= 250) {
      remainingJSX = (
        <span className='gray-70 h5'>
          {`${this.remaining()} remaining`}
        </span>
      )
    }

    if (heading) {
      headingJSX = (
        <WideHeading>
          {heading} {remainingJSX}
        </WideHeading>
      )
    }

    let dateRegex = /\d{4}-\d{2}-\d{2}/

    if (dateRegex.test(this.state.value)) {
      type = 'date'
      Tag = 'input'
      let max = new Date()
      max = max.setFullYear(max.getFullYear() - 90)
      let min = new Date()
      min = min.setFullYear(min.getFullYear() - 18)
      minMax = {min, max}
    }

    let children = this.props.children ? this.props.children : null

    if (this.props.options) {
      Tag = 'select'
      children = this.props.options.map(option => {
        // if option is a string, the label is the same as the value
        let value = option, label = option

        // if option is an array, value first, label second
        if (option.constructor === Array) {
          value = option[0]; label = option[1]
        }
        return <option key={`option-${value}`} value={value}>{label}</option>
      })
    }

    return (
      <div key={`input-field-${attr}`} className={`relative ${this.props.className}`}>

        <Icon name={icon} className="gray-70 absolute t-0 l-0" />

        {headingJSX}

        <Tag
          {...minMax}
          autoFocus={this.props.autoFocus}
          name={this.props.name}
          type={type}
          ref={(element) =>{
            if (!element || !this.props.adjustHeight) return
            element.style.height = "0"
            const max = this.props.maxHeight
            const height = element.scrollHeight
            const newHeight = height < max ? height : max
            element.style.height = `${newHeight}px`
          }}
          placeholder={this.props.placeholder}
          className={`profile-detail-${attr} ${this.props.inputClassName}`}
          name={`profile[${attr}]`}
          value={this.state.value}
          onChange={this.onChange}
          onClick={this.props.onClick}
          onFocus={this.props.onFocus}>

          {children}

        </Tag>
      </div>
    )
  }
})

export default Input
