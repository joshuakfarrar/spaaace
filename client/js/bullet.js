define(['entity', 'mortal', 'physics/vector'], function(Entity, Mortal, Vector) {
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

    fire: function(position, angle, velocity) {
      var x = this.MAX_SPEED * Math.cos(angle * (Math.PI / 180)) + velocity.x,
          y = this.MAX_SPEED * Math.sin(angle * (Math.PI / 180)) + velocity.y;

      this.setPosition(position);

      this.body.setVelocity(new Vector(x, y));
      this.body.distance = new Vector(0, 0);

      this.exists = true;
    },

    handleCollision: function(entity) {
      if (entity instanceof Mortal) {
        this.hitMortal(entity);
      }
    },

    hitMortal: function(mortal) {
      if (!mortal || !(mortal instanceof Mortal)) return false;

      var damage = Math.floor(Math.random() * 4) + 1;
      mortal.damage(damage);

      this.destroy();
    },

    // pixi
    getPose: function() {
      return 'img/ball.png';
    },
    // end pixi

    tick: function() {
      if (this.body.distanceTraveled() > 500) {
        this.destroy();
      }
    },

    destroy: function() {
      this._super();
      this.exists = false;
    }
  });

  return Bullet;
});
