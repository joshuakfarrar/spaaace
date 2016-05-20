define(['physics/world', 'physics/rectangle', 'physics/body'], function(World, Rectangle, Body) {
  var Physics = Class.extend({
    init: function(game) {
      this.game = game;

      var bounds = new Rectangle(0, 0, game.MAX_WIDTH, game.MAX_HEIGHT);
      this.world = new World(bounds);
    },

    getBodiesThatIntersectWith: function(point) {
      var bodies = this.world.getActiveBodies();

      var self = this;
      return _.filter(bodies, function(body) {
        return self.world.boundingRadiusCheck(body, { position: point, getBoundingRadius: function() { return 1; } });
      });
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
