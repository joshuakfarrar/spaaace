define(['physics/point', 'physics/vector', 'physics/circle'], function(Point, Vector, Circle) {
  var Body = Class.extend({
    init: function() {
      this.position = new Point(0, 0);

      this.velocity = new Vector(0, 0);

      this.acceleration = new Vector(0, 0);

      this.angularVelocity = 0;

      this.angle = 0;

      this.maxSpeed = 0;

      this.speed = 0;

      this.shape;

      this.enabled = false;
    },

    setShape: function(shape) {
      this.shape = shape;
    },

    getBoundingRadius: function() {
      if (this.shape && this.shape instanceof Circle) {
        return this.shape.radius;
      }
    },

    getPosition: function() {
      return this.position;
    },

    setMaxSpeed: function(speed) {
      this.maxSpeed = speed;
    },

    tick: function() {
      this.angle += this.angularVelocity;

      this.velocity.add(this.acceleration);

      this.speed = this.velocity.length();

      if (this.speed > this.maxSpeed) {
        this.velocity.multiply(this.maxSpeed/this.speed);
      }

      this.position.move(this.velocity);
    },

    getSpeed: function() {
      return this.speed;
    },

    setVelocity: function(velocity) {
      this.velocity = velocity;
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