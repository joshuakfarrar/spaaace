define(function() {
  var Area = Class.extend({
    init: function(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    },

    contains: function(entity) {
      if (entity) {
        var a = (this.x > entity.body.position.x) ? (this.x - entity.body.position.x) : (entity.body.position.x - this.x);
        var b = (this.y > entity.body.position.y) ? (this.y - entity.body.position.y) : (entity.body.position.y - this.y);

        return this.radius * this.radius >= ((a * a) + (b * b));
      } else {
        return false;
      }
    },
  });
  
  return Area;
});