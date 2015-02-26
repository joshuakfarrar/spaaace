define(['physics/world', 'physics/rectangle', 'physics/body'], function(World, Rectangle, Body) {
  var Physics = Class.extend({
    init: function(game) {
      this.game = game;

      var canvas = this.game.renderer.spaceCanvas;
      var bounds = new Rectangle(0, 0, canvas.width, canvas.height);

      this.world = new World(bounds);
    },

    enable: function(entity) {
      if (entity && entity.body && entity.body.active == false) {
        this.world.addBody(entity.body);
      }
    },

    step: function() {
      this.world.step();
    }
  });

  return Physics;
});