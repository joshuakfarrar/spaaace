define(['star'], function(Star) {
  var Map = Class.extend({
    init: function(renderer) {
      this.renderer = renderer;
      this.canvas = this.renderer.canvas;

      this.stars = [];

      this.backcanvas = document.createElement('canvas');
      this.context = (this.backcanvas && this.backcanvas.getContext) ? this.backcanvas.getContext("2d") : null;
    },

    renderBackground: function() {
      this.clearCanvas();
      this.drawStars();
    },

    clearCanvas: function() {
      this.context.fillStyle = "#000000";
      this.context.fillRect(0, 0, this.backcanvas.width, this.backcanvas.height);
    },

    initStars: function() {
      var stars = this.backcanvas.width;

      for (var i = 0, len = stars; i < len; i++) {
        this.stars.push(
          new Star(
            Math.floor(Math.random() * this.backcanvas.width),
            Math.floor(Math.random() * this.backcanvas.height),
            Math.floor(Math.random() * 2 + 1)
          )
        );
      }
    },

    drawStars: function() {
      _.each(this.stars, this.drawStar, this);
    },

    drawStar: function(star) {
      this.context.fillStyle = "#ffffff";
      this.context.fillRect(star.x, star.y, star.size, star.size);
    },

    rescale: function() {
      this.backcanvas.width = this.canvas.width * 3;
      this.backcanvas.height = this.canvas.height * 3;

      this.initStars();
      this.renderBackground();
    }
  });

  return Map;
});