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
    },

    accelerate: function() {
      if (this.body) {
        this.body.acceleration.x = Math.cos(this.angle * (Math.PI / 180)) * this.ACCELERATION;
        this.body.acceleration.y = Math.sin(this.angle * (Math.PI / 180)) * this.ACCELERATION;
      }
    },

    rotateLeft: function() {
      if (this.body) {
        this.body.angularVelocity = -this.ROTATION_SPEED;
      }
    },

    rotateRight: function() {
      if (this.body) {
        this.body.angularVelocity = this.ROTATION_SPEED;
      }
    }
  });

  return Ship;
});