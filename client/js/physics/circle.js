define(function() {
  var Circle = Class.extend({
    init: function(radius) {
      this.radius = radius || 1;
    }
  });

  return Circle;
});