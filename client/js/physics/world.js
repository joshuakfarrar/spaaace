define(function() {
  var World = Class.extend({
    init: function() {
      this.bodies = [];
    },

    addBody: function(body) {
      this.bodies.push(body);
    },

    step: function() {
      _.each(this.bodies, function(body) {
        body.tick();
      });
    }
  });

  return World;
});