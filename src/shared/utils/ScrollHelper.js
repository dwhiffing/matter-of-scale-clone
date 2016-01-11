/* istanbul ignore next */
var easing = function (x) {
  if (x < 0.5) return Math.pow(x*2, 2)/2;
  return 1-Math.pow((1-x)*2, 2)/2;
}

var requestAnimationFrame = (function () {
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame
})();

var __currentPositionY  = 0;
var __currentPositionX  = 0;
var __startPositionY    = 0;
var __startPositionX    = 0;
var __targetPositionY   = 0;
var __targetPositionX   = 0;
var __progress          = 0;
var __duration          = 0;
var __cancel            = false;

var __start;
var __comp;
var __deltaTop;
var __deltaLeft;
var __percent;

/* istanbul ignore next */
var animateTopScroll = function(timestamp) {
  // Cancel on specific events
  if(__cancel) { return };

  __deltaTop = Math.round(__targetPositionY - __startPositionY);

  if (__start === null) {
    __start = timestamp;
  }

  __progress = timestamp - __start;
  __percent = (__progress >= __duration ? 1 : easing(__progress/__duration));
  __currentPositionY = __startPositionY + Math.ceil(__deltaTop * __percent);
  __comp.scrollTop = __currentPositionX

  if(__percent < 1) {
    requestAnimationFrame(animateTopScroll);
  }
};

/* istanbul ignore next */
var animateLeftScroll = function(timestamp) {
  // Cancel on specific events
  if(__cancel) { return };

  __deltaLeft = Math.round(__targetPositionX - __startPositionX);

  if (__start === null) {
    __start = timestamp;
  }

  __progress = timestamp - __start;
  __percent = (__progress >= __duration ? 1 : easing(__progress/__duration));
  __currentPositionX = __startPositionX + Math.ceil(__deltaLeft * __percent);
  __comp.scrollLeft = __currentPositionX

  if(__percent < 1) {
    requestAnimationFrame(animateLeftScroll);
  }

};

/* istanbul ignore next */
var startAnimateTopScroll = function(wrap, y, options) {
  __start           = null;
  __cancel          = false;
  __comp            = wrap || window;
  __startPositionY  = __comp.scrollTop
  __targetPositionY = y
  __duration        = options.duration || 1000;

  requestAnimationFrame(animateTopScroll);
};

/* istanbul ignore next */
var startAnimateLeftScroll = function(wrap, x, options) {
  __start           = null;
  __cancel          = false;
  __comp            = wrap || window;
  __startPositionX  = __comp.scrollLeft
  __targetPositionX = x
  __duration        = options.duration || 1000;

  requestAnimationFrame(animateLeftScroll);
};

module.exports = {
  animateTopScroll: startAnimateTopScroll,
  animateLeftScroll: startAnimateLeftScroll
};