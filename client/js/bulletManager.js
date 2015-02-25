// http://www.photonstorm.com/flash-game-dev-tips/flash-game-dev-tip-3-bullet-manager-part-1
define(['bullet', 'physics/body', 'physics/circle'], function(Bullet, Body, Circle) {
  var BulletManager = Class.extend({
    init: function() {
      this.bullets = [];

      for (var i = 0; i < 50; i++) {
        var bullet = new Bullet()
          , body = new Body();

        body.setMaxSpeed(bullet.MAX_SPEED);
        bullet.setBody(body);

        this.bullets.push(bullet);
      }
    },

    initBulletSprites: function(sprites) {
      _.each(this.bullets, function(bullet) {
        bullet.setSprite(sprites[bullet.getSpriteName()]);

        var circle = new Circle(bullet.sprite.width / 2);

        bullet.body.setShape(circle);
      }, this);
    },

    getAvailableBullet: function() {
      return _.detect(this.bullets, function(bullet) { return bullet.exists == false; });
    },

    fire: function(params) {
      var bullet = this.getAvailableBullet();

      if (!bullet) throw new Error("No bullets available!");

      bullet.fire(params.position, params.angle, params.velocityOffset);

      return bullet;
    }
  });

  return BulletManager;
});