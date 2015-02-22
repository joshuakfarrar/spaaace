define(['physics/quadtree'], function(Quadtree) {
  var World = Class.extend({
    init: function(bounds) {
      this.bodies = [];

      this.tree = new Quadtree(bounds);
    },

    addBody: function(body) {
      this.bodies.push(body);
    },

    step: function() {
      var self = this;

      // broad-phase collision detection
      self.tree.clear();

      _.each(this.bodies, function(body) {
        self.tree.insert(body);
      });

      _.each(this.bodies, function(body) {
        body.tick();
      });
    }
  });

  return World;
});