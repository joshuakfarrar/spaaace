define(['physics/quadtree'], function(Quadtree) {
  var World = Class.extend({
    init: function(bounds) {
      this.bodies = [];

      this.tree = new Quadtree(bounds);

      this.collidingBodies = [];
    },

    addBody: function(body) {
      body.active = true;
      this.bodies.push(body);
    },

    getActiveBodies: function() {
      return _.select(this.bodies, function(body) { return body.active === true; });
    },

    step: function() {
      var bodies = this.getActiveBodies();

      // broad-phase collision detection
      this.tree.clear();

      for (var i = 0, len = bodies.length; i !== len; i++) {
        var body = bodies[i];

        this.tree.insert(body);
      }

      this.collidingBodies.length = 0;

      for (var i = 0, len = bodies.length; i !== len; i++) {
        var bodyA = bodies[i];

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

      for (var i = 0, len = bodies.length; i !== len; i++) {
        bodies[i].tick();
      }

      this.cullBodies();
    },

    boundingRadiusCheck: function(bodyA, bodyB) {
      var x = bodyA.position.x - bodyB.position.x,
          y = bodyA.position.y - bodyB.position.y;

      var d2 = x * x + y * y,
           r = bodyA.getBoundingRadius() + bodyB.getBoundingRadius();

      return d2 <= r * r;
    },

    cullBodies: function() {
      for (var i = this.bodies.length - 1; i !== 0; i--) {
        if (this.bodies[i].active === false) {
          this.bodies.splice(i, 1);
        }
      }
    }
  });

  return World;
});