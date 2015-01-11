define(['star', 'area'], function(Star, Area) {
  var Map = Class.extend({
    init: function(game) {
      this.game = game;

      this.stars = [];
      this.areas = [];
    },

    addArea: function(x, y, width, height) {
      var area = new Area(x, y, width, height);
      this.areas.push(area);
    },

    getCurrentZone: function(entity) {
      var area = _.detect(this.areas, function(area) {
        return area.contains(entity);
      });

      if (area) {
        console.log("You're in an area!");
      }
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