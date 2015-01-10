define(['keyboard'], function(Keyboard) {
  var Updater = Class.extend({
    init: function(game) {
      this.game = game;
      this.player = this.game.player;
    },

    update: function() {

      // handle inputs
      if (this.game.input.isKeyDown(Keyboard.A)) {
        this.player.body.angularVelocity = -this.player.ROTATION_SPEED;
      } else if (this.game.input.isKeyDown(Keyboard.D)) {
        this.player.body.angularVelocity = this.player.ROTATION_SPEED;
      } else {
        this.player.body.angularVelocity = 0;
      }

      if (this.game.input.isKeyDown(Keyboard.W)) {
        this.player.body.acceleration.x = Math.cos(this.player.angle * (Math.PI / 180)) * this.player.ACCELERATION;
        this.player.body.acceleration.y = Math.sin(this.player.angle * (Math.PI / 180)) * this.player.ACCELERATION;
      } else {
        this.player.body.acceleration.x = 0;
        this.player.body.acceleration.y = 0;
      }

      // console.log(this.player.body.position.x, this.player.body.position.y);

      // call tick() to update all entities w/ attached physics
      _.each(this.game.entities, function(entity) {
        if (entity && entity.body) {
          entity.body.tick();
        }
      });
    },
  });

  return Updater;
});