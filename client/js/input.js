define(['key'], function(Key) {
  var Input = Class.extend({
    init: function(game) {
      this.game = game;
      this.keys = [];
    },

    processKeyDown: function(event) {
      if (!this.keys[event.keyCode]) {
        this.keys[event.keyCode] = new Key(this.game, event.keyCode);
      }

      this.keys[event.keyCode].processKeyDown();
    },

    processKeyUp: function(event) {
      if (!this.keys[event.keyCode]) {
        this.keys[event.keyCode] = new Key(this.game, event.keyCode);
      }

      this.keys[event.keyCode].processKeyUp();
    },

    isKeyDown: function(keyCode) {
      if (this.keys[keyCode]) {
        return this.keys[keyCode].isDown;
      }
      return false;
    }
  });

  return Input;
});