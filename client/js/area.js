define(function() {
  var Area = Class.extend({
    init: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },

    contains: function(entity) {
      if(entity) {
        return entity.body.position.x >= this.x
          && entity.body.position.y >= this.y
          && entity.body.position.x < this.x + this.width
          && entity.body.position.y < this.y + this.height;
      } else {
        return false;
      }
    }
  });
  
  return Area;
});