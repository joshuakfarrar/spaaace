define(['physics/world', 'physics/body'], function(World, Body) {
  var Physics = Class.extend({
    init: function() {
      this.world = new World();
    },

    enable: function(entity) {
      entity.body = new Body(entity);
      this.world.addBody(entity.body);
    },

    step: function() {
      this.world.step();
    }
  });

  return Physics;
});