define(['map', 'ship', 'bullet'], function(Map, Ship, Bullet) {
  var Renderer = Class.extend({
    init: function(game, canvas, background, foreground) {
      this.game = game;
      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
      this.background = (background && background.getContext) ? background.getContext("2d") : null;
      this.foreground = (foreground && foreground.getContext) ? foreground.getContext("2d") : null;

      this.canvas = canvas;
      this.backcanvas = background;
      this.forecanvas = foreground;

      this.spaceCanvas = document.createElement('canvas');
      this.space = (this.spaceCanvas && this.spaceCanvas.getContext) ? this.spaceCanvas.getContext("2d") : null;

      this.spaceEntitiesCanvas = document.createElement('canvas');
      this.spaceEntities = (this.spaceEntitiesCanvas && this.spaceEntitiesCanvas.getContext) ? this.spaceEntitiesCanvas.getContext("2d") : null;

      this.map = new Map(this);

      this.initFPS();
      this.tilesize = 16;

      this.lastTime = new Date();
      this.frameCount = 0;
      this.maxFPS = this.FPS;
      this.realFPS = 0;

      this.gridW = 30;
      this.gridH = 14;

      this.rescale();
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
      this.canvas.width = this.gridW * this.tilesize * 2;
      this.canvas.height = this.gridH * this.tilesize * 2;
  
      this.backcanvas.width = this.canvas.width;
      this.backcanvas.height = this.canvas.height;
  
      this.forecanvas.width = this.canvas.width;
      this.forecanvas.height = this.canvas.height;

      this.spaceCanvas.width = this.canvas.width * 7;
      this.spaceCanvas.height = this.canvas.height * 7;

      this.spaceEntitiesCanvas.width = this.canvas.width * 7;
      this.spaceEntitiesCanvas.height = this.canvas.height * 7;

    },

    renderFrame: function() {
      var player = this.game.player.getPosition();

      this.clearScreen(this.context);
      this.drawSpace(player.x, player.y);
      this.drawSpaceEntities(player.x, player.y);
      this.drawPlayer();
    },

    clearScreen: function(context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    },

    drawBackground: function(context, color) {
      context.save();
        context.fillStyle = color;
        context.fillRect(0, 0, this.spaceCanvas.width, this.spaceCanvas.height);
      context.restore();
    },

    drawSpace: function(x, y) {
      var center = {
        x: x || 0,
        y: y || 0
      }

      var canvas = this.spaceCanvas,
          sx = center.x - this.canvas.width / 2,
          sy = center.y - this.canvas.height / 2,
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
      var map = this.game.map;

      map.generateStars(this.spaceCanvas);

      this.drawBackground(this.space, "#000000");
      this.drawStars(map.stars);
      this.drawPlanets(map.planets);
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

    drawPlanets: function(planets) {
      _.each(planets, this.drawPlanet, this);
    },

    drawPlanet: function(planet) {
      var colors = {
        red:   "#ff0000",
        green: "#00ff00",
        white: "#ffffff",
        black: "#000000"
      }

      this.space.save();
        // this.space.beginPath();
        // this.space.strokeStyle = "#fafafa";
        // this.space.strokeRect(
        //   planet.area.x - planet.area.radius,
        //   planet.area.y - planet.area.radius,
        //   planet.area.radius * 2,
        //   planet.area.radius * 2
        // );

        this.space.beginPath();
        this.space.arc(planet.area.x, planet.area.y, planet.area.radius, 0, 2 * Math.PI, false);
        this.space.lineWidth = 1;
        this.space.strokeStyle = (planet.hostile) ? colors.red : colors.green;
        this.space.stroke();

        this.space.fillStyle = colors.white;
        this.space.beginPath();
        this.space.arc(planet.x, planet.y, planet.radius, 0, 2 * Math.PI, false);
        this.space.fill();
      this.space.restore();
    },

    drawPlayer: function() {
      var player = this.game.player,
          ship = player.ship;

      var sprite = ship.sprite,
          angle = ship.getAngle(),
          x = 0,
          y = 0,
          dx = sprite.offsetX,
          dy = sprite.offsetY,
          dw = sprite.width,
          dh = sprite.height;

      // this is totally a hack
      if (ship.isMoving()) {
        y = 32;
      }

      this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(angle * Math.PI/180);
        this.context.drawImage(sprite.image, x, y, 32, 32, dx, dy, dw, dh);
      this.context.restore();
    },

    drawSpaceEntities: function(x, y) {
      this.clearScreen(this.spaceEntities);
      this.drawQuadtree(this.game.physics.world.tree);
      this.drawBodies(this.game.physics.world.bodies);
      this.drawEntities();
      this.renderEntities(x, y);
    },

    drawEntities: function() {
      var self = this;

      this.game.forEachEntity(function(entity) {
        self.drawEntity(entity);
      });
    },

    drawEntity: function(entity) {
      if (typeof entity === 'undefined') return false;

      var sprite = entity.sprite,
          angle = entity.getAngle(),
          x = 0,
          y = 0,
          dx = sprite.offsetX,
          dy = sprite.offsetY,
          dw = sprite.width,
          dh = sprite.height;

      // this is totally a hack
      if (entity instanceof Ship && entity.isMoving()) {
        y = 32;
      }

      this.spaceEntities.save();
        this.spaceEntities.translate(entity.body.position.x, entity.body.position.y);
        this.spaceEntities.rotate(angle * Math.PI/180);
        this.spaceEntities.drawImage(sprite.image, Math.floor(x), Math.floor(y), 32, 32, dx, dy, dw, dh);
      this.spaceEntities.restore();
    },

    drawBodies: function(bodies) {
      var self = this;

      _.each(bodies, function(body) {
        self.drawBody(body);
      });
    },

    drawBody: function(body) {
      this.spaceEntities.save();
        this.spaceEntities.beginPath();
        this.spaceEntities.arc(body.position.x, body.position.y, body.shape.radius, 0, 2 * Math.PI, false);
        this.spaceEntities.lineWidth = 1;
        this.spaceEntities.strokeStyle = "#ff00ff";
        this.spaceEntities.stroke();
      this.spaceEntities.restore();
    },

    renderEntities: function(x, y) {
      var center = {
        x: x || 0,
        y: y || 0
      }

      var canvas = this.spaceEntitiesCanvas,
          sx = center.x - this.canvas.width / 2,
          sy = center.y - this.canvas.height / 2,
          swidth = this.canvas.width,
          sheight = this.canvas.height,
          x = 0,
          y = 0,
          width = this.canvas.width,
          height = this.canvas.height;

      this.background.drawImage(canvas, sx, sy, swidth, sheight, x, y, width, height);
    },

    drawQuadtree: function(tree) {
      this.drawNode(tree.root);
    },

    drawNode: function(node) {
      if (node.nodes.length) {
        _.each(node.nodes, this.drawNode, this);
      }

      this.spaceEntities.save();
        this.spaceEntities.strokeStyle = "#50b4a2";
        this.spaceEntities.strokeRect(
          node._bounds.x,
          node._bounds.y,
          node._bounds.width,
          node._bounds.height
        );
      this.spaceEntities.restore();
    }
  });

  return Renderer;
});