define(['captain'], function(Captain) {
  var Bot = Captain.extend({
    tick: function() {
      this.followTarget();
    },

    followTarget: function() {
      this.turnToTarget();
      this.accelerate();
    },

    turnToTarget: function() {
      var ship = this.getShip();

      if (!this.target || !ship) return this.doNothing();

      var dx = this.target.body.position.x - this.getShip().body.position.x;
      var dy = this.target.body.position.y - this.getShip().body.position.y;

      var angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (angle > ship.angle) {
        this.turnRight();
      } else {
        this.turnLeft();
      }
    },

    doNothing: function() {
      return false;
    }
  });

  return Bot;
});