define(['physics/quadtree'], function(Quadtree) {
  var World = Class.extend({
    init: function(bounds) {
      this.bodies = [];

      this.tree = new Quadtree(bounds);

      this.collidingBodies = [];
    },

    addBody: function(body) {
      this.bodies.push(body);
      body.enabled = true;
    },

    cullBodies: function() {
      for (var i = this.bodies.length - 1; i !== 0; i--) {
        if (this.bodies[i].enabled === false) {
          this.bodies.splice(i, 1);
        }
      }
    },

    step: function() {
      // broad-phase collision detection
      this.tree.clear();

      for (var i = 0, len = this.bodies.length; i !== len; i++) {
        var body = this.bodies[i];

        this.tree.insert(body);
      }

      this.collidingBodies.length = 0;

      for (var i = 0, len = this.bodies.length; i !== len; i++) {
        var bodyA = this.bodies[i];

        var siblings = this.tree.retrieve(bodyA) || [];

        for (var j = 0; j < siblings.length; j++) {
          var bodyB = siblings[j];

          // bodies cannot collide with themselves
          if (bodyA === bodyB) {
            continue;
          }

          if (this.boundingRadiusCheck(bodyA, bodyB)) {
            bodyA.entity.collision(bodyB.entity);
          }
        }
      }

      this.cullBodies();

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