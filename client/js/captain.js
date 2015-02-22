define(['ship', 'entity', 'point'], function(Ship, Entity, Point) {
  var Captain = Class.extend({
    init: function(id, name, game) {
      this.id = id;
      this.name = name;
      this.game = game;
    },

    setShip: function(ship) {
      if (ship instanceof Ship) {
        var self = this;

        this.ship = ship;

        this.ship.setFire(function() {
          self.game.addBullet(self);
        });

        return true;
      } else {
        return false;
      }
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
    }
  });

  return Captain;
});