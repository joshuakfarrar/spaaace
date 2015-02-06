define(['areas/circular'], function(CircularArea) {
  var Planet = Class.extend({
    init: function(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;

      this.area = new CircularArea(x, y, radius * 4);
    }
  });

  return Planet;
});