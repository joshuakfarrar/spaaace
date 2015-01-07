define(['camera', 'map'], function(Camera, Map) {
  var Renderer = Class.extend({
    init: function(game, canvas, background, foreground) {
      this.game = game;
      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
      this.background = (background && background.getContext) ? background.getContext("2d") : null;
      this.foreground = (foreground && foreground.getContext) ? foreground.getContext("2d") : null;
  
      this.canvas = canvas;
      this.backcanvas = background;
      this.forecanvas = foreground;

      this.map = new Map(this);

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

      this.map.rescale();
    },

    renderFrame: function() {
      this.clearScreen(this.context);

      this.drawBackground();
      this.drawEntities();
    },

    clearScreen: function(context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawBackground: function(context) {
      this.background.drawImage(this.map.backcanvas, this.camera.x + this.game.player.body.position.x, this.camera.y + this.game.player.body.position.y, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
    },

    drawEntities: function() {
      var self = this;

      this.game.forEachEntity(function(entity) {
        self.drawEntity(entity);
      });
    },

    drawEntity: function(entity) {
      var sprite = entity.sprite,
          angle = entity.angle
          dx = sprite.offsetX,
          dy = sprite.offsetY,
          dw = sprite.width,
          dh = sprite.height;

      this.context.save();
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.context.rotate(angle * Math.PI/180);
      this.context.drawImage(sprite.image, 0, 0, 32, 32, dx, dy, 32, 32);
      this.context.restore();
    }
  });

  return Renderer;
});