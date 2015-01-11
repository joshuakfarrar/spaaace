define(function() {
  var Body = Class.extend({
    init: function(entity) {
      this.entity = entity;

      this.MAX_VELOCITY = { x: 2, y: 2 };

      this.position = { x: this.entity.x || 0, y: this.entity.y || 0 };

      this.velocity = { x: 0, y: 0 };
      this.acceleration = { x: 0, y: 0 };

      this.angularVelocity = 0;
    },

    tick: function() {
      this.entity.angle += this.angularVelocity;

      this.velocity.x = this.computeVelocity(this.velocity.x, this.acceleration.x, this.MAX_VELOCITY.x);
      this.velocity.y = this.computeVelocity(this.velocity.y, this.acceleration.y, this.MAX_VELOCITY.y);

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    },

    computeVelocity: function(velocity, acceleration, max) {
      velocity += acceleration;

      if (Math.abs(velocity) > max) {
        velocity = (velocity > 0) ? max : -max;
      }

      return velocity;
    }
  });

  return Body;
});