define(function() {
  var Sprite = Class.extend({
    init: function(name) {
      this.name = name;
      this.isLoaded = false;

      this.filepath = "img/" + this.name + ".png";

      this.offsetX = -16;
      this.offsetY = -16;

      this.width = 32;
      this.height = 32;

      this.rotation = 0;

      this.load();
    },

    load: function() {
      var self = this;

      this.image = new Image();
      this.image.src = this.filepath;

      this.image.onload = function() {
        self.isLoaded = true;
      };
    }
  });

  return Sprite;
});