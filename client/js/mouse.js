define(['physics/point'], function(Point) {
  return Class.extend({
    init: function() {
      this.position = {
        x: 0,
        y: 0
      }
    },

    click: function() {
      this.clicked = true;
      this.clickPosition = {
        x: this.position.x,
        y: this.position.y
      };
    },

    setPosition: function(p) {
      this.position = p;
    },

    getPosition: function() {
      return this.position;
    }
  });
});
