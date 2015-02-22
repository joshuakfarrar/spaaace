define(function() {
  var Rectangle = Class.extend({
    init: function(width, height) {
      this.width = width;
      this.height = height;
    }
  });

  return Rectangle;
});