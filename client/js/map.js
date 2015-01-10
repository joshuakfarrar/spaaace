define(['star'], function(Star) {
  var Map = Class.extend({
    init: function(game) {
      this.game = game;

      this.stars = [];
    },

    generateStars: function(spacecanvas) {
      var stars = spacecanvas.width;

      for (var i = 0, len = stars; i < len; i++) {
        this.stars.push(
          new Star(
            Math.floor(Math.random() * spacecanvas.width),
            Math.floor(Math.random() * spacecanvas.height),
            Math.floor(Math.random() * 2 + 1)
          )
        );
      }
    }
  });

  return Map;
});