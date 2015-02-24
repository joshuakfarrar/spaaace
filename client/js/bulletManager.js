define(['bullet', 'physics/body', 'physics/circle'], function(Bullet, Body, Circle) {
  var BulletManager = Class.extend({
    init: function(game) {
      this.game = game;

      this.bullets = [];

      for (var i = 0; i < 5; i++) {
        var bullet = new Bullet()
          , body = new Body();

        body.setMaxSpeed(bullet.MAX_SPEED);
        bullet.setBody(body);

        this.bullets.push(bullet);
      }
    },

    initBulletSprites: function() {
      var self = this;

      _.each(this.bullets, function(bullet) {
        bullet.setSprite(self.game.sprites[bullet.getSpriteName()]);

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

      bullet.setPosition(params.position);
      bullet.fire(params.angle, params.velocityOffset);

      return bullet;
    }
  });

  return BulletManager;
});