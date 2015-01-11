define(['entity'], function(Entity) {
  var Player = Entity.extend({
    init: function(id, name, game) {
      this._super(id);
      this.name = name;
      this.game = game;

      this.x = 300;
      this.y = 300;

      this.angle = -90;

      this.ROTATION_SPEED = 2;
      this.ACCELERATION = .05;

      // sprites
      this.spriteName = "ship";
    },

    getSpriteName: function() {
      return this.spriteName;
    },

    isMoving: function() {
      if (this.body.acceleration.x || this.body.acceleration.y) {
        return true;
      } else {
        return false;
      }
    }

  });

  return Player;
});