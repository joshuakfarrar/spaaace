define(['entity', 'physics'], function(Entity) {
  var Ship = Entity.extend({
    init: function(name) {
      this.name = name;
    },

    setFire: function(fireCallback) {
      this.fire = fireCallback;
    },

    fireWeapon: function() {
      if (this.firing) return false;

      var self = this;

      this.firing = true;

      if (this.fire) {
        this.fire();
      }

      setTimeout(function() {
        self.firing = false;
      }, 100);
    },

    isMoving: function() {
      if (this.body) {
        return this.body.isInMotion();
      }
      return false;
    },

    getPosition: function() {
      if (this.body) {
        return this.body.getPosition();
      }
    },

    getGunPosition: function() {
      throw new Error("No gun position defined!");
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