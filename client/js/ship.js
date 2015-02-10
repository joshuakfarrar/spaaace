define(['entity', 'physics'], function(Entity) {
  var Ship = Entity.extend({
    init: function(name) {
      this.name = name;
    },

    getSpriteName: function() {
      return this.spriteName;
    },

    isMoving: function() {
      if (this.body.acceleration.x || this.body.acceleration.y) {
        return true;
      } else {
        return false;
      }
    }
  });

  return Ship;
});