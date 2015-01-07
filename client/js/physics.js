define(['body'], function(Body) {
  var Physics = Class.extend({
    init: function(game) {
      this.game = game;
    },

    enable: function(entity) {
      entity.body = new Body(entity);
    }
  });

  return Physics;
});