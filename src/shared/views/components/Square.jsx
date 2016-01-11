import React from 'react';

export default React.createClass({
  displayName: 'Square',

  render() {
    return (
      <div className={`square relative ${this.props.className}`}>
        <img src={'/javascripts/foster/images/transparent.png'} className={`${this.props.imageClass} width-100`}/>
        {this.props.children}
      </div>
    )
  }
});
