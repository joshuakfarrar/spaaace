define(['entity'], function(Entity) {
  var Mortal = Entity.extend({
    init: function(id) {
      this._super(id);
    },

    damage: function(amount) {
      this.health -= amount;

      if (this.health <= 0) {
        this.kill();
      }
    }
  });

  return Mortal;
});