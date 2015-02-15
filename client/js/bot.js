define(['captain'], function(Captain) {
  var Bot = Captain.extend({
    tick: function() {
      this.followTarget();
    },

    followTarget: function() {
      this.turnToTarget();
      this.fireWeapon();
      this.accelerate();
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

      var dx = this.target.body.position.x - this.getShip().body.position.x;
      var dy = this.target.body.position.y - this.getShip().body.position.y;

      var angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (normalizeAngle(angle - ship.angle) > 0) {
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