define(['ship', 'entity'], function(Ship, Entity) {
  var Captain = Class.extend({
    init: function(id, name, game) {
      this.id = id;
      this.name = name;
      this.game = game;
    },

    setShip: function(ship) {
      if (ship instanceof Ship) {
        this.ship = ship;
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