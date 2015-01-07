define(function() {
  var Star = Class.extend({
    init: function(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  });

  return Star;
});