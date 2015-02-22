define(['captain'], function(Captain) {
  var Bot = Captain.extend({
    tick: function() {
      if (this.aggressive) {
        this.attackTarget();
      } else {
        this.followTarget();
      }
    },

    attackTarget: function() {
      this.turnToTarget();
      this.fireWeapon();
      this.accelerate();
    },

    followTarget: function() {
      this.turnToTarget();
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

  return Bot;
});