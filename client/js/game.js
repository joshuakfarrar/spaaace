define(['renderer', 'updater'], function(Renderer, Updater) {
  var Game = Class.extend({
    init: function(app) {
      this.app = app;
      this.ready = false;
      this.started = false;
      this.hasNeverStarted = true;
    },

    setup: function(canvas, background, foreground) {
      this.setRenderer = new Renderer(this, canvas, background, foreground);
    },

    setRenderer: function(renderer) {
      this.renderer = renderer;
    },

    run: function() {
      this.setUpdater = new Updater(this);

      if(this.hasNeverStarted) {
        this.start();
      }
    },

    tick: function() {
      console.log("tick");
      this.currentTime = new Date().getTime();

      if (this.started) {
        this.updater.update();
        this.renderer.renderFrame();
      }

      if(!this.isStopped) {
        requestAnimFrame(this.tick.bind(this));
      }
    },

    start: function() {
      this.tick();
      this.hasNeverStarted = false;
    },

    stop: function() {
      this.isStopped = true;
    }
  });

  return Game;
});