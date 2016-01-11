import React from 'react'

export default React.createClass({

  propTypes: {
    onUploadImage: React.PropTypes.func,
    style: React.PropTypes.object,
    uploadPrivate: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      className: '',
      style: {},
      uploadPrivate: false
    }
  },

  _handleImageChange(e) {
    e.preventDefault()
    if (this.props.onUploadImage) {
      let data = new FormData()
      data.append("photo[file]", e.target.files[0])
      data.append("photo[private]", this.props.uploadPrivate.toString())
      this.props.onUploadImage(data)
    }
    this.refs.input.value = ""
  },

  render() {
    return (
      <input ref="input" className={this.props.className} type="file" onChange={this._handleImageChange} style={this.props.style} />
    )
  }
})
