define(function() {
  var Vector = Class.extend({
    init: function(x, y) {
      this.x = x;
      this.y = y;
    },

    length: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  });

  return Vector;
});