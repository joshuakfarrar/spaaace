define(['entity', 'vector'], function(Entity, Vector) {
  var Bullet = Entity.extend({
    init: function(id) {
      this._super(id);

      this.MAX_VELOCITY = new Vector(5, 5);

      this.velocity = new Vector(0, 0);

      this.spriteParams = {
        name: "ball",
        width: 4,
        height: 4
      };
    },

    setAngle: function(angle) {
      var x = 1,
          y = 1;

      var x = this.MAX_VELOCITY.x * Math.cos(angle * (Math.PI / 180)),
          y = this.MAX_VELOCITY.y * Math.sin(angle * (Math.PI / 180));

      this.velocity = new Vector(x, y);
    }
  });

  return Bullet;
});