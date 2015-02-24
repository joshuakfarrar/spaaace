define(function() {
  var Vector = Class.extend({
    init: function(x, y) {
      this.x = x;
      this.y = y;
    },

    length: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    add: function(vector) {
      if (vector instanceof Vector) {
        this.x += vector.x;
        this.y += vector.y;
      }
    },

    multiply: function(n) {
      if (typeof n === 'number') {
        this.x *= n;
        this.y *= n;
      }
    }
  });

  return Vector;
});