define(['vector'], function(Vector) {
  var Point = Class.extend({
    init: function(x, y) {
      this.x = x;
      this.y = y;
    },

    move: function(vector) {
      if (vector instanceof Vector) {
        this.x += vector.x;
        this.y += vector.y;
      }
    }
  });

  return Point;
});