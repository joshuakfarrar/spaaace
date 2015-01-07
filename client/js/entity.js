define(function() {
  var Entity = Class.extend({
    init: function(id) {
      this.id = id;

      this.sprite = null;
    },

    setSprite: function(sprite) {
      this.sprite = sprite;
    }
  });

  return Entity;
});