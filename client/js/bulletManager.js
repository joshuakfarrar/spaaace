// http://www.photonstorm.com/flash-game-dev-tips/flash-game-dev-tip-3-bullet-manager-part-1
define(['bullet', 'physics/body', 'physics/circle'], function(Bullet, Body, Circle) {
  var BulletManager = Class.extend({
    init: function() {
      this.bullets = [];

      for (var i = 0; i < 200; i++) {
        var bullet = new Bullet()
          , body = new Body();

        body.setMaxSpeed(bullet.MAX_SPEED);
        bullet.setBody(body);

        this.bullets.push(bullet);
      }
    },

    initBulletSprites: function(sprites) {
      _.each(this.bullets, function(bullet) {
        // bullet.setSprite(sprites[bullet.getSpriteName()]);

        var circle = new Circle(2);

        bullet.body.setShape(circle);
      }, this);
    },

    getAvailableBullet: function() {
      return _.detect(this.bullets, function(bullet) { return bullet.exists == false; });
    },

    getActiveBullets: function() {
      return _.filter(this.bullets, function(bullet) { return bullet.exists == true; });
    },

    fire: function(params) {
      var bullet = this.getAvailableBullet();

      if (!bullet) throw new Error("No bullets available!");

      bullet.fire(params.position, params.angle, params.velocityOffset);

      return bullet;
    },

    tick: function() {
      var bullets = this.getActiveBullets();
      for (var i = 0, len = bullets.length; i < len; i++) {
        bullets[i].tick();
      }
    }
  });

  return BulletManager;
});
