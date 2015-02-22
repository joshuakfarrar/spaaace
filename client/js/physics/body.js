define(['physics/point', 'physics/vector'], function(Point, Vector) {
  var Body = Class.extend({
    init: function() {
      this.position = new Point(0, 0);

      this.velocity = new Vector(0, 0);

      this.acceleration = new Vector(0, 0);

      this.angularVelocity = 0;

      this.angle = 0;

      this.maxSpeed = 0;

      this.speed = 0;

      this.shapes = [];
    },

    addShape: function(shape) {
      this.shapes.push(shape);
    },

    getPosition: function() {
      return this.position;
    },

    setMaxSpeed: function(speed) {
      this.maxSpeed = speed;
    },

    tick: function() {
      this.angle += this.angularVelocity;

      this.velocity.x = this.computeVelocity(this.velocity.x, this.acceleration.x);
      this.velocity.y = this.computeVelocity(this.velocity.y, this.acceleration.y);

      this.speed = this.velocity.length();

      if (this.speed > this.maxSpeed) {
        this.velocity.x *= this.maxSpeed/this.speed;
        this.velocity.y *= this.maxSpeed/this.speed;
      }

      this.position.move(this.velocity);
    },

    getSpeed: function() {
      return this.speed;
    },

    computeVelocity: function(velocity, acceleration) {
      velocity += acceleration;

      return velocity;
    },

    isInMotion: function() {
      return this.acceleration.x || this.acceleration.y;
    }
  });

  return Body;
});