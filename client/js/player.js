define(['captain'], function(Captain) {
  var Player = Captain.extend({
    stopRotation: function() {
      if (this.hasShip()) {
        this.ship.body.angularVelocity = 0;
      }
    },

    stopAccelerating: function() {
      if (this.hasShip()) {
        this.ship.body.acceleration.x = 0;
        this.ship.body.acceleration.y = 0;
      }
    }
  });

  return Player;
});