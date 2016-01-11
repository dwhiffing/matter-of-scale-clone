Date.prototype.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Date.prototype.monthNamesShort = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
Date.prototype.getMonthName = function() {
  return this.monthNames[this.getMonth()];
}
Date.prototype.getMonthNameShort = function(chars) {
  return this.monthNamesShort[this.getMonth()];
};

Array.prototype.move = function (fro, to) {
  if (to >= this.length) {
    var k = to - this.length;
    while ((k--) + 1) this.push(undefined);
  }
  this.splice(new_index, 0, this.splice(fro, 1)[0]);
};

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i=0; i<this.length; i+=chunkSize) {
      R.push(this.slice(i,i+chunkSize));
    }
    return R;
  }
});




window.offsetHeight = () => {
  var body = document.body,
      html = document.documentElement;
  return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )
}
