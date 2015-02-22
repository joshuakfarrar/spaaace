define(['entity', 'physics/vector'], function(Entity, Vector) {
  var Bullet = Entity.extend({
    init: function(id) {
      this._super(id);

      this.MAX_VELOCITY = new Vector(6, 6);
      this.ACCELERATION = 2;

      this.spriteParams = {
        name: "ball",
        width: 4,
        height: 4
      };
    },

    fire: function(angle, startingVelocity) {
      var x = this.MAX_VELOCITY.x * Math.cos(angle * (Math.PI / 180)) + startingVelocity.x,
          y = this.MAX_VELOCITY.y * Math.sin(angle * (Math.PI / 180)) + startingVelocity.y;

      this.body.velocity = new Vector(x, y);
    }
  });

  return Bullet;
});