define(['entity', 'physics/vector'], function(Entity, Vector) {
  var Bullet = Entity.extend({
    init: function(id) {
      this._super(id);

      this.MAX_SPEED = 6;
      this.ACCELERATION = 2;

      this.spriteParams = {
        name: "ball",
        width: 4,
        height: 4
      };

      this.exists = false;
    },

    fire: function(angle, startingVelocity) {
      var x = this.MAX_SPEED * Math.cos(angle * (Math.PI / 180)) + startingVelocity.x,
          y = this.MAX_SPEED * Math.sin(angle * (Math.PI / 180)) + startingVelocity.y;

      this.body.velocity = new Vector(x, y);

      this.exists = true;
    }
  });

  return Bullet;
});