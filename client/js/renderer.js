define(['camera'], function(Camera) {
  var Renderer = Class.extend({
    init: function(game, canvas, background, foreground) {
      this.game = game;
      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
      this.background = (background && background.getContext) ? background.getContext("2d") : null;
      this.foreground = (foreground && foreground.getContext) ? foreground.getContext("2d") : null;
  
      this.canvas = canvas;
      this.backcanvas = background;
      this.forecanvas = foreground;

      this.initFPS();
      this.tilesize = 16;

      this.rescale();

      this.lastTime = new Date();
      this.frameCount = 0;
      this.maxFPS = this.FPS;
      this.realFPS = 0;
    },

    initFPS: function() {
      this.FPS = 50;
    },

    getWidth: function() {
      return this.canvas.width;
    },

    getHeight: function() {
      return this.canvas.height;
    },

    rescale: function() {
      this.createCamera();
    },

    createCamera: function() {
      this.camera = new Camera(this);
      this.camera.rescale();
  
      this.canvas.width = this.camera.gridW * this.tilesize * 2;
      this.canvas.height = this.camera.gridH * this.tilesize * 2;
  
      this.backcanvas.width = this.canvas.width;
      this.backcanvas.height = this.canvas.height;
  
      this.forecanvas.width = this.canvas.width;
      this.forecanvas.height = this.canvas.height;
    },

    renderFrame: function() {
      this.clearScreen(this.context);
    },

    clearScreen: function(context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  });

  return Renderer;
});