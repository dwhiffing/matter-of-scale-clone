import React from 'react';

const ImageLoader = React.createClass({
  propTypes: {
    wrapper: React.PropTypes.func,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    preloader: React.PropTypes.func,
    src: React.PropTypes.string,
    onLoad: React.PropTypes.func,
    onError: React.PropTypes.func,
    imgProps: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      wrapper: React.DOM.span
    }
  },

  componentWillMount() {
    this.setState({status: this.props.src ? 'loading' : 'pending'})
  },

  componentDidMount() {
    if (this.state.status === 'loading') {
      this.createLoader();
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? 'loading' : 'pending',
      });
    }
  },

  componentDidUpdate() {
    if (this.state.status === 'loading' && !this.img) {
      this.createLoader();
    }
  },

  componentWillUnmount() {
    this.destroyLoader();
  },

  getClassName() {
    let className = `imageloader ${this.state.status}`;
    if (this.props.className) className = `${className} ${this.props.className}`;
    return className;
  },

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = this.handleLoad
    this.img.onerror = this.handleError
    this.img.src = this.props.src;
  },

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  },

  handleLoad(event) {
    this.destroyLoader();
    this.setState({status: 'loaded'});

    if (this.props.onLoad) this.props.onLoad(event);
  },

  handleError(error) {
    this.destroyLoader();
    this.setState({status: 'failed'});

    if (this.props.onError) this.props.onError(error);
  },

  renderImg() {
    const {src, imgProps} = this.props;
    let props = {src};

    for (let k in imgProps) {
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return <img {...props} />;
  },

  render() {
    let wrapperProps = {
      className: this.getClassName(),
    };

    if (this.props.style) {
      wrapperProps.style = this.props.style;
    }

    let wrapperArgs = [wrapperProps];

    switch (this.state.status) {
      case 'loaded':
        wrapperArgs.push(this.renderImg());
        break;

      case 'failed':
        if (this.props.children) wrapperArgs.push(this.props.children);
        break;

      default:
        if (this.props.preloader) wrapperArgs.push(this.props.preloader());
        break;
    }

    return this.props.wrapper(...wrapperArgs);
  }
})

export default ImageLoader
