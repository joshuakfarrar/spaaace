define(['point', 'vector'], function(Point, Vector) {
  var Body = Class.extend({
    init: function(entity) {
      this.entity = entity;

      this.position = this.entity.position || new Point(0, 0);

      this.velocity = this.entity.velocity || new Vector(0, 0);
      this.acceleration = this.entity.acceleration || new Vector(0, 0);

      this.angularVelocity = 0;
    },

    getPosition: function() {
      return this.position;
    },

    tick: function() {
      this.entity.angle += this.angularVelocity;

      this.velocity.x = this.computeVelocity(this.velocity.x, this.acceleration.x, this.entity.MAX_VELOCITY.x);
      this.velocity.y = this.computeVelocity(this.velocity.y, this.acceleration.y, this.entity.MAX_VELOCITY.y);

      this.position.move(this.velocity);
    },

    computeVelocity: function(velocity, acceleration, max) {
      velocity += acceleration;

      if (Math.abs(velocity) > max) {
        velocity = (velocity > 0) ? max : -max;
      }

      return velocity;
    },

    isInMotion: function() {
      return this.acceleration.x || this.acceleration.y;
    }
  });

  return Body;
});