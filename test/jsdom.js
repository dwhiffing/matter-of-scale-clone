// TODO: should remove this, wallaby.node still errors when including jsx files in node without it
require('babel/register');
// TODO: should remove this and build jsdom objects as needed throughout testing
// create simulated document/window since we are testing in node
var jsdom = require('jsdom')
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

// mirror all window keys to global as a browser would
Object.keys(window).forEach(function(key) {
  if (!global[key]) global[key] = window[key]
})
