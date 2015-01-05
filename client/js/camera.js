define(function() {
  var Camera = Class.extend({
    init: function(renderer) {
      this.renderer = renderer;
      this.x = 0;
      this.y = 0;
      this.gridW = 0;
      this.gridH = 0;
      this.rescale();
    },

    rescale: function() {
      this.gridW = 30;
      this.gridH = 14;
    }
  });

  return Camera;
});