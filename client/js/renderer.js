define(['map', 'entity', 'mortal', 'ship', 'bullet'], function(Map, Entity, Mortal, Ship, Bullet) {
  var Renderer = Class.extend({
    COLORS: {
      RED:   "#ff0000",
      GREEN: "#00ff00",
      WHITE: "#ffffff",
      BLACK: "#000000",
      MAGENTA: "#ff00ff",
      TEAL: "#50b4a2"
    },

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
      this.renderSpace(player.x, player.y);
      this.drawSpaceEntities();
      this.renderEntities(player.x, player.y);
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

    renderSpace: function(x, y) {
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

      this.drawBackground(this.background, this.COLORS.BLACK);
      this.background.drawImage(canvas, sx, sy, swidth, sheight, x, y, width, height);
    },

    drawSpace: function() {
      var map = this.game.map;

      map.generateStars(this.spaceCanvas);

      this.drawBackground(this.space, this.COLORS.BLACK);
      this.drawStars(map.stars);
      this.drawPlanets(map.planets);
    },

    drawStars: function(stars) {
      _.each(stars, this.drawStar, this);
    },

    drawStar: function(star) {
      this.space.save();
        this.space.fillStyle = this.COLORS.WHITE;
        this.space.fillRect(star.x, star.y, star.size, star.size);
      this.space.restore();
    },

    drawPlanets: function(planets) {
      _.each(planets, this.drawPlanet, this);
    },

    drawPlanet: function(planet) {
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
        this.space.strokeStyle = (planet.hostile) ? this.COLORS.RED : this.COLORS.GREEN;
        this.space.stroke();

        this.space.fillStyle = this.COLORS.WHITE;
        this.space.beginPath();
        this.space.arc(planet.x, planet.y, planet.radius, 0, 2 * Math.PI, false);
        this.space.fill();
      this.space.restore();
    },

    drawSpaceEntities: function() {
      this.clearScreen(this.spaceEntities);
      // this.drawQuadtree(this.game.physics.world.tree);
      // this.drawBodies(this.game.physics.world.bodies);
      this.drawEntities();
    },

    drawEntities: function() {
      var self = this;

      this.game.forEachEntity(function(entity) {
        if (entity instanceof Mortal) {
          self.drawMortal(entity);
        } else {
          self.drawEntity(entity);
        }
      });
    },

    drawMortal: function(mortal) {
      if (!(mortal instanceof Mortal)) {
        return false;
      }

      var sprite = mortal.sprite,
        dx = sprite.offsetX,
        dy = sprite.offsetY,
        dw = sprite.width;

      var x = mortal.body.position.x + dx,
        y = mortal.body.position.y + dy * 2;
        width = dw * (mortal.health / mortal.MAX_HEALTH);

      this.drawHealthbar(x, y, width);
      this.drawEntity(mortal);
    },

    drawHealthbar: function(x, y, width) {
      this.spaceEntities.save();
        this.spaceEntities.translate(x, y);
        this.spaceEntities.beginPath();
        this.spaceEntities.moveTo(0, 0);
        this.spaceEntities.lineTo(width, 0);
        this.spaceEntities.strokeStyle = this.COLORS.WHITE;
        this.spaceEntities.lineWidth = 2;
        this.spaceEntities.stroke();
      this.spaceEntities.restore();
    },

    drawEntity: function(entity) {
      if (typeof entity === 'undefined' || !(entity instanceof Entity)) return false;

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
        this.spaceEntities.strokeStyle = this.COLORS.MAGENTA;
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
        this.spaceEntities.strokeStyle = this.COLORS.TEAL;
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