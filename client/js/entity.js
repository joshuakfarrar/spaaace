define(function() {
  var Entity = Class.extend({
    init: function(id) {
      this.id = id;

      this.sprite = null;
    },

    setSprite: function(sprite) {
      this.sprite = sprite;
    },

    setPosition: function(x, y) {
      this.x = x;
      this.y = y;
    },

    setAngle: function(angle) {
      this.angle = angle;
    }
  });

  return Entity;
});