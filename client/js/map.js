define(['star'], function(Star) {
  var Map = Class.extend({
    init: function(game) {
      this.game = game;

      this.stars = [];
      this.planets = [];
      this.areas = [];
    },

    addPlanet: function(planet) {
      this.planets.push(planet);
      this.areas.push(planet.area);
    },

    getCurrentZones: function(entity) {
      var areas = _.filter(this.areas, function(area) {
        return area.contains(entity);
      });

      if (areas.length > 0) {
        _.each(areas, function(area) {
          try {
            area.event();
          } catch (e) {
            // console.log(e); // ignore
          }
        });
      }
    },

    generateStarfield: function(width, height) {
      var stars = width;

      for (var i = 0, len = stars; i < len; i++) {
        this.stars.push(
          new Star(
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height),
            Math.floor(Math.random() * 2 + 1)
          )
        );
      }
    }
  });

  return Map;
});
