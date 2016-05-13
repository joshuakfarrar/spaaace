define(['screen', 'camera', 'map', 'entity', 'mortal', 'ship', 'bullet'], function(Screen, Camera, Map, Entity, Mortal, Ship, Bullet) {
  var Renderer = Class.extend({
    // COLORS: {
    //   RED:   "#ad1e34",
    //   GREEN: "#5aa58c",
    //   WHITE: "#ffffff",
    //   BLACK: "#1b1824",
    //   MAGENTA: "#ff00ff",
    //   TEAL: "#50b4a2"
    // },

    init: function(game, canvas, background, foreground) {
      this.game = game;

      this.map = new Map(this);

      this.initFPS();

      this.MAX_WIDTH = game.MAX_WIDTH;
      this.MAX_HEIGHT = game.MAX_HEIGHT;

      this.lastTime = new Date();
      this.frameCount = 0;
      this.maxFPS = this.FPS;
      this.realFPS = 0;

      this.gridW = 30;
      this.gridH = 14;
      this.tilesize = 16;

      var width = this.gridW * this.tilesize * 3;
      var height = this.gridH * this.tilesize * 3.5

      var screen = new Screen(width, height);
      this.screen = screen;

      this.renderer = new PIXI.autoDetectRenderer(screen.width, screen.height, {
        backgroundColor: 0x1b1824,
        antialias: true
      });
      this.graphics = new PIXI.Graphics();
      this.ui = new PIXI.Graphics();
      this.stage = new PIXI.Container();

      this.loader = PIXI.loader;
      this.loader.add('ship', '/img/ship.json');
      this.loader.add('bullet', '/img/ball.png');
      var self = this;
      this.loader.once('complete', function() {
        self.sprite = PIXI.Sprite.fromFrame('ship/inactive.png');
      });
      this.loader.load();

      var camera = new Camera(this);
      camera.lookAt(this.game.player);
      this.camera = camera;

      document.getElementById('canvas').appendChild(this.renderer.view);
    },

    initFPS: function() {
      this.FPS = 50;
    },

    getScreen: function() {
      return this.screen;
    },

    renderFrame: function() {
      var player = this.game.player.getPosition();

      this.ui.clear();
      this.drawSpaceEntities();
      this.renderer.render(this.stage);

      var focus = this.camera.getFocus();
      this.stage.position.x = focus.x;
      this.stage.position.y = focus.y;
    },

    drawSpace: function() {
      var map = this.game.map;

      map.generateStarfield(this.MAX_WIDTH, this.MAX_HEIGHT);

      this.drawStars(map.stars);

      var sprite = new PIXI.Sprite(this.graphics.generateTexture());
      this.stage.addChild(sprite);
      this.stage.addChild(this.ui);
    },

    drawStars: function(stars) {
      _.each(stars, this.drawStar, this);
    },

    drawStar: function(star) {
      this.graphics.beginFill(0xffffff);
      this.graphics.drawRect(star.x, star.y, star.size, star.size);
      this.graphics.endFill();
    },

    drawPlanets: function(planets) {
      _.each(planets, this.drawPlanet, this);
    },

    drawPlanet: function(planet) {
      var color = (planet.hostile) ? 0xff0000 : 0x00ff00;
      this.ui.lineStyle(1, color);
      this.ui.drawCircle(planet.x, planet.y, planet.area.radius);
      this.ui.lineStyle(0);

      this.ui.beginFill(0xffffff);
      this.ui.drawCircle(planet.x, planet.y, planet.radius);
      this.ui.endFill();
    },

    drawSpaceEntities: function() {
      this.drawPlanets(this.game.map.planets);
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

      if (!mortal.atFullHealth()) {
        this.drawHealthbar(mortal);
      }

      this.drawEntity(mortal);
    },

    drawHealthbar: function(mortal) {
      var sprite = mortal.sprite,
        dx = sprite.offsetX,
        dy = sprite.offsetY,
        dw = sprite.width;

      var x = mortal.body.position.x + dx,
        y = mortal.body.position.y + dy * 2;
        width = dw * mortal.getHealthAsPercent() / 100;

      this.ui.lineStyle(2, 0xffffff);
      this.ui.moveTo(x, y);
      this.ui.lineTo(x + width, y);
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

      // pixi
      // if (entity instanceof Ship) {
      var s = entity.getSprite();
      if (typeof s === 'undefined') {
        s = PIXI.Sprite.fromFrame('ship/inactive.png');
        entity.setPixiSprite(s);
        this.stage.addChild(s);
      }

      var pose = entity.getPose();

      if (entity instanceof Bullet) {
        s.texture = PIXI.Sprite.fromImage(pose).texture;
      } else if (entity instanceof Ship) {
        s.texture = PIXI.Sprite.fromFrame(pose).texture;
      }

      if (entity.alive === false) {
        this.stage.removeChild(s);
        entity.setPixiSprite();
      } else {
        s.position.x = entity.body.position.x;
        s.position.y = entity.body.position.y;
        s.height = dh;
        s.width = dw;
        s.anchor.x = 0.5;
        s.anchor.y = 0.5;
        s.rotation = (angle * Math.PI) / 180;
      }
    },

    // drawBodies: function(bodies) {
    //   var self = this;
    //
    //   _.each(bodies, function(body) {
    //     self.drawBody(body);
    //   });
    // },
    //
    // drawBody: function(body) {
    //   this.spaceEntities.save();
    //     this.spaceEntities.beginPath();
    //     this.spaceEntities.arc(body.position.x, body.position.y, body.shape.radius, 0, 2 * Math.PI, false);
    //     this.spaceEntities.lineWidth = 1;
    //     this.spaceEntities.strokeStyle = this.COLORS.MAGENTA;
    //     this.spaceEntities.stroke();
    //   this.spaceEntities.restore();
    // },

    // drawQuadtree: function(tree) {
    //   this.drawNode(tree.root);
    // },

    // drawNode: function(node) {
    //   if (node.nodes.length) {
    //     _.each(node.nodes, this.drawNode, this);
    //   }
    //
    //   this.spaceEntities.save();
    //     this.spaceEntities.strokeStyle = this.COLORS.TEAL;
    //     this.spaceEntities.strokeRect(
    //       node._bounds.x,
    //       node._bounds.y,
    //       node._bounds.width,
    //       node._bounds.height
    //     );
    //   this.spaceEntities.restore();
    // }
  });

  return Renderer;
});
