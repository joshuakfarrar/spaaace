define(['physics/point', 'physics/vector'], function(Point, Vector) {
  var Body = Class.extend({
    init: function() {
      this.position = new Point(0, 0);
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(0, 0);
      this.angularVelocity = 0;
      this.angle = 0;

      this.maxVelocity = new Vector(1, 1);

      this.shapes = [];
    },

    addShape: function(shape) {
      this.shapes.push(shape);
    },

    getPosition: function() {
      return this.position;
    },

    setMaxVelocity: function(vector) {
      this.maxVelocity = vector;
    },

    tick: function() {
      this.angle += this.angularVelocity;

      this.velocity.x = this.computeVelocity(this.velocity.x, this.acceleration.x, this.maxVelocity.x);
      this.velocity.y = this.computeVelocity(this.velocity.y, this.acceleration.y, this.maxVelocity.y);

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