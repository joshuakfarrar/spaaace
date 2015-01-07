define(function() {
  var Key = Class.extend({
    init: function(game, keycode) {
      isDown = false;
    },

    processKeyDown: function() {
      this.isDown = true;
    },

    processKeyUp: function() {
      this.isDown = false;
    }
  });

  return Key;
});