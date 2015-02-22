define(['physics/world', 'physics/body'], function(World, Body) {
  var Physics = Class.extend({
    init: function() {
      this.world = new World();
    },

    attachBody: function(entity) {
      entity.body = new Body(entity);
    },

    enable: function(entity) {
      if (entity && entity.body) {
        this.world.addBody(entity.body);
      }
    },

    step: function() {
      this.world.step();
    }
  });

  return Physics;
});