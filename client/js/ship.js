define(['entity', 'physics'], function(Entity) {
  var Ship = Entity.extend({
    init: function(name) {
      this.name = name;
    },

    fireWeapon: function() {
      if (this.firing) return false;

      var self = this;

      this.firing = true;

      console.log("pew!");

      setTimeout(function() {
        self.firing = false;
      }, 100);
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