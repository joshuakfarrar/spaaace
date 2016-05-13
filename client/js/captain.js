define(['ship', 'entity', 'physics/point'], function(Ship, Entity, Point) {
  var Captain = Class.extend({
    init: function(id, name, game) {
      this.id = id;
      this.name = name;
      this.game = game;
    },

    setShip: function(ship) {
      if (! ship instanceof Ship) return false;

      var self = this;

      this.ship = ship;

      this.ship.setFire(function() {
        self.game.fireBullet(self);
      });

      return true;
    },

    getShip: function() {
      return this.ship;
    },

    target: function(entity) {
      if (entity instanceof Entity) {
        this.target = entity;
      }
    },

    accelerate: function() {
      if (this.hasShip()) {
        this.ship.accelerate();
      }
    },

    turnLeft: function() {
      if (this.hasShip()) {
        this.ship.rotateLeft();
      }
    },

    turnRight: function() {
      if (this.hasShip()) {
        this.ship.rotateRight();
      }
    },

    fireWeapon: function() {
      if (this.hasShip()) {
        this.ship.fireWeapon();
      }
    },

    hasShip: function() {
      return this.ship && this.ship.body
    },

    getPosition: function() {
      var position;

      if (this.hasShip()) {
        position = this.ship.getPosition();
      } else {
        position = new Point(0, 0);
      }

      return position;
    },

    getGunPosition: function() {
      var position;

      if (this.hasShip()) {
        position = this.ship.getGunPosition();
      } else {
        position = new Point(0 , 0);
      }

      return position;
    },

    getAngle: function() {
      var angle = (this.hasShip()) ? this.ship.getAngle() : 0;

      return angle;
    },

    turnToTarget: function() {
      var ship = this.getShip();

      if (!this.target || !ship) return this.doNothing();

      var normalizeAngle = function(angle) {
        while (angle >= 180) {
          angle -= 360;
        }
        while (angle < -180) {
          angle += 360;
        }
        return angle;
      }

      var dx = this.target.body.position.x - ship.body.position.x;
      var dy = this.target.body.position.y - ship.body.position.y;

      var angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (normalizeAngle(angle - ship.getAngle()) > 0) {
        this.turnRight();
      } else {
        this.turnLeft();
      }
    },

    doNothing: function() {
      return false;
    }
  });

  return Captain;
});
