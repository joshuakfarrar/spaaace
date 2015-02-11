define(['ship'], function(Ship) {
  var Captain = Class.extend({
    init: function(id, name, game) {
      this.id = id;
      this.name = name;
      this.game = game;
    },

    setShip: function(ship) {
      if (ship instanceof Ship) {
        this.ship = ship;
        return true;
      } else {
        return false;
      }
    },

    getShip: function() {
      return this.ship;
    },

    accelerate: function() {
      if (this.hasShip()) {
        this.ship.body.acceleration.x = Math.cos(this.ship.angle * (Math.PI / 180)) * this.ship.ACCELERATION;
        this.ship.body.acceleration.y = Math.sin(this.ship.angle * (Math.PI / 180)) * this.ship.ACCELERATION;
      }
    },

    hasShip: function() {
      return this.ship && this.ship.body
    },

    getPosition: function() {
      var position = (this.hasShip()) ? {
        x: this.ship.body.position.x,
        y: this.ship.body.position.y
      } : {
        x: 0,
        y: 0
      }

      return position;
    }
  });

  return Captain;
});