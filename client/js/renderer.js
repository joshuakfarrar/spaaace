define(['camera', 'map', 'player'], function(Camera, Map, Player) {
  var Renderer = Class.extend({
    init: function(game, canvas, background, foreground) {
      this.game = game;
      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
      this.background = (background && background.getContext) ? background.getContext("2d") : null;
      this.foreground = (foreground && foreground.getContext) ? foreground.getContext("2d") : null;

      this.canvas = canvas;
      this.backcanvas = background;
      this.forecanvas = foreground;

      this.spacecanvas = document.createElement('canvas');
      this.space = (this.spacecanvas && this.spacecanvas.getContext) ? this.spacecanvas.getContext("2d") : null;

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

      this.spacecanvas.width = this.canvas.width * 7;
      this.spacecanvas.height = this.canvas.height * 7;

    },

    renderFrame: function() {
      this.clearScreen(this.context);

      this.drawSpace();
      this.drawEntities();
    },

    clearScreen: function(context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawBackground: function(context, color) {
      context.save();
        context.fillStyle = color;
        context.fillRect(0, 0, this.spacecanvas.width, this.spacecanvas.height);
      context.restore();
    },

    drawSpace: function() {
      var canvas = this.spacecanvas,
          sx = this.game.player.body.position.x - this.canvas.width / 2,
          sy = this.game.player.body.position.y - this.canvas.height / 2,
          swidth = this.canvas.width,
          sheight = this.canvas.height,
          x = 0,
          y = 0,
          width = this.canvas.width,
          height = this.canvas.height;

      this.drawBackground(this.background, "#000000");
      this.background.drawImage(canvas, sx, sy, swidth, sheight, x, y, width, height);
    },

    renderSpace: function() {
      var m = this.game.map;

      m.generateStars(this.spacecanvas);

      this.drawBackground(this.space, "#000000");
      this.drawStars(m.stars);
    },

    drawStars: function(stars) {
      _.each(stars, this.drawStar, this);
    },

    drawStar: function(star) {
      this.space.save();
        this.space.fillStyle = "#ffffff";
        this.space.fillRect(star.x, star.y, star.size, star.size);
      this.space.restore();
    },

    drawEntities: function() {
      var self = this;

      this.game.forEachEntity(function(entity) {
        self.drawEntity(entity);
      });
    },

    drawEntity: function(entity) {
      var sprite = entity.sprite,
          angle = entity.angle,
          x = 0,
          y = 0,
          dx = sprite.offsetX,
          dy = sprite.offsetY,
          dw = sprite.width,
          dh = sprite.height;

      // this is totally a hack
      if (entity instanceof Player && this.game.player.isMoving()) {
        y = 32;
      }

      this.context.save();
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.context.rotate(angle * Math.PI/180);
      this.context.drawImage(sprite.image, x, y, 32, 32, dx, dy, 32, 32);
      this.context.restore();
    }
  });

  return Renderer;
});