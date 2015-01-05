define(['renderer'], function(Renderer) {
  var Game = Class.extend({
    init: function(app) {
      this.app = app;
    },

    setup: function(canvas, background, foreground) {
      this.setRenderer = new Renderer(this, canvas, background, foreground);
    },

    setRenderer: function(renderer) {
      this.renderer = renderer;
    }
  });

  return Game;
});