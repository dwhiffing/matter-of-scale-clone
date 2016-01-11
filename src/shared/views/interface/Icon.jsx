import React from 'react';

const Icon = React.createClass({

  shouldComponentUpdate(nextProps) {
    return this.props.className !== nextProps.className || this.props.name !== nextProps.name || this.props.children !== nextProps.children
  },

  render() {
    let props = Object.assign({}, this.props)
    delete props.className
    return (
      <i className={`icon-${this.props.name} ${this.props.className}`} {...props}>
        {this.props.children}
      </i>
    )
  }
})

export default Icon
