define(['physics/world'], function(World) {
  var Physics = Class.extend({
    init: function() {
      this.world = new World();
    },

    enable: function(entity) {
      this.world.add(entity);
    },

    step: function() {
      this.world.step();
    }
  });

  return Physics;
});