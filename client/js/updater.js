define(['keyboard', 'bullet'], function(Keyboard, Bullet) {
  var Updater = Class.extend({
    init: function(game) {
      this.game = game;
      this.player = this.game.player;
    },

    update: function() {
      this.processInput();
      this.updatePhysics();
      this.updateBots();
      this.cleanup();
      this.checkZones();
    },

    processInput: function() {
      if (this.game.input.isKeyDown(Keyboard.A)) {
        this.player.turnLeft();
      } else if (this.game.input.isKeyDown(Keyboard.D)) {
        this.player.turnRight();
      } else {
        this.player.stopRotation();
      }

      if (this.game.input.isKeyDown(Keyboard.W)) {
        this.player.accelerate();
      } else {
        this.player.stopAccelerating();
      }

      if (this.game.input.isKeyDown(Keyboard.Space)) {
        this.player.fireWeapon();
      }
    },

    updatePhysics: function() {
      this.game.physics.step();
    },

    updateBots: function() {
      this.game.pruneBots();

      this.game.forEachBot(function(bot) {
        if (bot && bot.tick) {
          bot.tick();
        }
      });
    },

    cleanup: function() {
      this.game.bullets.tick();
      this.game.pruneEntities();
      this.game.physics.cullBodies();
    },

    checkZones: function() {
      this.game.map.getCurrentZones(this.player.ship);
    }
  });

  return Updater;
});