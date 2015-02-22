define(['physics/body'], function(Body) {
  var World = Class.extend({
    init: function() {
      this.bodies = [];
    },

    add: function(entity) {
      entity.body = new Body(entity);
      this.bodies.push(entity.body);
    },

    step: function() {
      _.each(this.bodies, function(body) {
        body.tick();
      });
    }
  });

  return World;
});