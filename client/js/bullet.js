define(['entity'], function(Entity) {
  var Bullet = Entity.extend({
    init: function() {
      console.log("pew!");
    }
  });

  return Bullet;
});