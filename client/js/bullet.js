define(['entity'], function(Entity) {
  var Bullet = Entity.extend({
    init: function() {
      this._super();

      this.MAX_VELOCITY = { x: 2, y: 2 };
      this.ACCELERATION = 2;

      this.spriteParams = {
        name: "ball",
        width: 4,
        height: 4
      };
    }
  });

  return Bullet;
});