import React from 'react'

let _ePos, _eTime, _width, _tapDebounce

// TODO: Should add vertical dragging
// TODO: Should add lazy loading (Dont render children unless index is greater or equal)
// TODO: Could also implement auto playing

const TransformSwipe = React.createClass({

  propTypes: {
    onStart: React.PropTypes.func,
    onDrag: React.PropTypes.func,
    onStop: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      axis: 'x',
      className: "",
      dragThreshold: 0.15,
      width: Infinity,
      onStart: () => {},
      onDrag: () => {},
      onTap: () => {},
      onStop: () => {},
      updateIndex: () => {}
    }
  },

  getInitialState() {
    _width = Math.min(innerWidth, this.props.width)
    return {
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      clientX: 0-this.props.index * _width,
      clientY: 0
    }
  },

  componentWillReceiveProps(nextProps) {
    // if width has changed, reposition to the current index
    let newWidth = Math.min(innerWidth, this.props.width)
    if (newWidth !== _width || nextProps.index !== this.props.index) {
      const isDragging = newWidth !== _width
      _width = newWidth
      this.setState({
        clientX: 0-(_width * nextProps.index),
        isDragging: isDragging // don't transition after resize
      })
    }
  },

  componentWillUnmount() {
    this.refs.node.removeEventListener('touchmove', this.onTouch, true)
    this.refs.node.removeEventListener('touchend', this.onTouchEnd, true)
  },

  onTouchStart(e) {
    let dragPoint = this.getControlPosition(e)

    if (e.touches) _ePos = e.touches[0].screenX
    if (e.timeStamp) _eTime = e.timeStamp

    this.setState({
      isDragging: true,
      offsetX: parseInt(dragPoint.clientX, 10),
      offsetY: parseInt(dragPoint.clientY, 10),
      start: {x: this.state.clientX, y: this.state.clientY}
    })

    this.refs.node.addEventListener('touchmove', this.onTouch, true)
    this.refs.node.addEventListener('touchend', this.onTouchEnd, true)
    this.props.onStart(e, {position: {left: this.state.clientX, top: this.state.clientY}})
  },

  onTouch(e) {
    let dragPoint = this.getControlPosition(e)
    let {start, clientX, clientY, offsetX, offsetY} = this.state
    let {numElements} = this.props
    e.preventDefault();

    if (this.props.axis === 'x' || this.props.axis === 'both') {
      clientX = (start.x + (dragPoint.clientX - offsetX))
    }
    if (this.props.axis === 'y' || this.props.axis === 'both') {
      clientY = (start.y + (dragPoint.clientY - offsetY))
    }

    let min = numElements === 1 ? 0 : 30
    let max = _width * (numElements-1) + min
    if (clientX >= min) {
      clientX = min
    } else if (Math.abs(clientX) > max) {
      clientX = -max
    }

    this.setState({clientX, clientY})
    this.props.onDrag(e, {position: {left: this.state.clientX, top: this.state.clientY}})
  },

  onTouchEnd(e) {
    if (!this.state.isDragging || this.handleTap(e)) return

    let {clientX} = this.state
    let dist = ((clientX + _width * this.props.index) / _width).toFixed(2)

    // check if we should jump to the closest index
    if (Math.abs(dist) > this.props.dragThreshold) {
      let dir = dist > 0 ? -1 : 1
      clientX = 0-(_width * (this.props.index + dir))
    } else {
      clientX = 0-(_width * this.props.index)
    }

    this.props.updateIndex(Math.abs(clientX)/_width)
    this.setState({isDragging: false, clientX: clientX})

    this.refs.node.removeEventListener('touchmove', this.onTouch)
    this.refs.node.removeEventListener('touchend', this.onTouchEnd)
    this.props.onStop(e, {position: {left: this.state.clientX, top: this.state.clientY}})
  },

  handleTap(e) {
    let stop = e.changedTouches[0].screenX
    let tapTime = 300
    let minDist = 5

    if (!_tapDebounce && stop-minDist <= _ePos && stop+minDist >= _ePos && e.timeStamp <= _eTime + tapTime) {
      this.props.onTap(this.props.index, e)
      _tapDebounce = true
      setTimeout(() => _tapDebounce = false, 100)
      return true
    }
  },

  getControlPosition(e) {
    var position = (e.targetTouches && e.targetTouches[0]) || e
    return {
      clientX: position.clientX,
      clientY: position.clientY
    }
  },

  render() {
    let {clientX, clientY} = this.state

    let duration = this.state.isDragging ? '0ms' : '350ms'
    let style = {
      transitionDuration: duration,
      WebkitTransitionDuration: duration,
      transform: `translate3d(${clientX}px, 0px, 0px)`,
      WebkitTransform: `translate3d(${clientX}px, 0px, 0px)`,
      width: this.props.numElements * _width
    }

    let className = `${this.state.isDragging ? 'react-TransformSwipe-dragging' : ''} react-TransformSwipe ${this.props.className}`

    return React.cloneElement(this.props.children, {
      ref: "node",
      style: style,
      className: className,
      onTouchEnd: this.onTouchEnd,
      onTouchStart: function(e) {
        e.preventDefault();
        return this.onTouchStart.apply(this, arguments)
      }.bind(this)
    })
  }
})

export default TransformSwipe
