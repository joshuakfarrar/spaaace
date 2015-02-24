define(['physics/quadtree'], function(Quadtree) {
  var World = Class.extend({
    init: function(bounds) {
      this.bodies = [];

      this.tree = new Quadtree(bounds);

      this.collidingBodies = [];
    },

    addBody: function(body) {
      this.bodies.push(body);
    },

    step: function() {
      var self = this;

      // broad-phase collision detection
      self.tree.clear();

      for (var i = 0, len = this.bodies.length; i !== len; i++) {
        var body = this.bodies[i];
        this.tree.insert(body);
      }

      this.collidingBodies.length = 0;

      for (var i = 0, len = this.bodies.length; i !== len; i++) {
        var bodyA = this.bodies[i];

        var siblings = self.tree.retrieve(bodyA) || [];

        for (var j = 0; j < siblings.length; j++) {
          var bodyB = siblings[j];

          // bodies cannot collide with themselves
          if (bodyA === bodyB) {
            continue;
          }

          if (this.boundingRadiusCheck(bodyA, bodyB)) {
            this.collidingBodies.push(bodyA, bodyB);
          }
        }
      }

      if (this.collidingBodies.length > 0) {
        for (var i = 0, len = this.collidingBodies.length; i < len; i += 2) {
          var a = this.collidingBodies[i];
          var b = this.collidingBodies[i + 1]

          console.log("it's a hit!:", a.entity, b.entity);
        }
      }

      _.each(this.bodies, function(body) {
        body.tick();
      });
    },

    boundingRadiusCheck: function(bodyA, bodyB) {
      var x = bodyA.position.x - bodyB.position.x,
          y = bodyA.position.y - bodyB.position.y;

      var d2 = x * x + y * y,
           r = bodyA.getBoundingRadius() + bodyB.getBoundingRadius();

      return d2 <= r * r;
    }
  });

  return World;
});