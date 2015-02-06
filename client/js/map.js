define(['star', 'area', 'planet'], function(Star, Area, Planet) {
  var Map = Class.extend({
    init: function(game) {
      this.game = game;

      this.stars = [];
      this.planets = [];
      this.areas = [];
    },

    addArea: function(x, y, width, height) {
      var area = new Area(x, y, width, height);
      this.areas.push(area);
    },

    addPlanet: function(x, y, radius) {
      var planet = new Planet(x, y, radius);
      this.planets.push(planet);
      this.areas.push(planet.area);
    },

    // getCurrentZone: function(entity) {
    //   var area = _.detect(this.areas, function(area) {
    //     return area.contains(entity);
    //   });

    //   if (area) {
    //     // console.log("You're in an area!");
    //   }
    // },

    getCurrentZones: function(entity) {
      var areas = _.filter(this.areas, function(area) {
        return area.contains(entity);
      });

      if (areas.length > 0) {
        console.log('hey.');
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