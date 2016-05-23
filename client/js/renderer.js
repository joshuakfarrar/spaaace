define(['screen', 'camera', 'map', 'entity', 'mortal', 'ship', 'bullet'], function(Screen, Camera, Map, Entity, Mortal, Ship, Bullet) {
  var Renderer = Class.extend({
    COLORS: {
      WHITE: 0xffffff,
      BLACK: 0x1b1824,
      RED: 0xad1e34,
      TEAL: 0x19945c
    },

    init: function(game, width, height) {
      var self = this;
      this.game = game;

      this.map = new Map(this);

      this.initFPS();

      this.MAX_WIDTH = game.MAX_WIDTH;
      this.MAX_HEIGHT = game.MAX_HEIGHT;

      // this.lastTime = new Date();
      this.frameCount = 0;
      this.maxFPS = this.FPS;
      this.realFPS = 0;

      var screen = new Screen({
        width: width,
        height: height,
        background: this.COLORS.BLACK
      });
      this.screen = screen;

      var renderer = screen.getRenderer();
      this.interactions = new PIXI.interaction.InteractionManager(renderer, {
        autoPreventDefault: false
      });

      this.background = new PIXI.Graphics();
      this.graphics = new PIXI.Graphics();
      this.stage = new PIXI.Container();

      this.components = [];

      this.loader = PIXI.loader;
      this.loader.add('ship', '/img/ship.json');
      this.loader.add('bullet', '/img/ball.png');
      this.loader.load();

      var camera = new Camera(this);
      camera.lookAt(this.game.player);
      this.camera = camera;

      game.ui.call(this)
        .then(function(ui) {
          screen.addObserver(ui);
          self.ui = ui;
        });
    },

    resize(width, height) {
      this.screen.resize(width, height);
    },

    positionToPoint: function(x, y) {
      var p = new PIXI.Point();
      this.interactions.mapPositionToPoint(p, x, y);
      return p;
    },

    positionFromClick: function(x, y) {
      var focus = this.camera.getFocus();
      var p = this.positionToPoint(x, y);
      return {
        x: focus.x - p.x,
        y: focus.y - p.y
      };
    },

    initFPS: function() {
      this.FPS = 50;
    },

    getScreen: function() {
      return this.screen;
    },

    renderFrame: function() {
      this.graphics.clear();

      this.attemptActionOnInteractives(this.checkHoverState);

      this.drawSpaceEntities();
      this.drawGraphics();

      var renderer = this.screen.getRenderer();
      renderer.clearBeforeRender = true;
      renderer.render(this.stage);
      renderer.clearBeforeRender = false;
      if (this.ui) renderer.render(this.ui.container);

      var focus = this.camera.getFocus();
      this.stage.position.x = focus.x;
      this.stage.position.y = focus.y;
    },

    attemptClickOnInteractiveElement: function() {
      this.attemptActionOnInteractives(function(e, hit) {
        if (!hit) return false;
        else e.onClick();
      });
    },

    attemptActionOnInteractives: function(cb) {
      var mouse = this.game.mouse.getPosition();
      var p = this.positionToPoint(mouse.x, mouse.y);
      this.interactions.processInteractive(p, this.stage, cb, true);
      this.interactions.processInteractive(p, this.ui.container, cb, true);
    },

    checkHoverState: function(e, hit) {
      e.onHover(hit);
    },

    drawSpace: function() {
      var map = this.game.map;

      map.generateStarfield(this.MAX_WIDTH, this.MAX_HEIGHT);

      this.drawStars(map.stars);

      var sprite = new PIXI.Sprite(this.background.generateTexture());
      this.stage.addChild(sprite);
      this.stage.addChild(this.graphics);
    },

    drawStars: function(stars) {
      _.each(stars, this.drawStar, this);
    },

    drawStar: function(star) {
      this.background.beginFill(0xffffff);
      this.background.drawRect(star.x, star.y, star.size, star.size);
      this.background.endFill();
    },

    drawPlanets: function(planets) {
      _.each(planets, this.drawPlanet, this);
    },

    drawPlanet: function(planet) {
      var color = (planet.hostile) ? this.COLORS.RED : 0x00ff00;
      this.graphics.lineStyle(1, color);
      this.graphics.drawCircle(planet.x, planet.y, planet.area.radius);
      this.graphics.lineStyle(0);

      this.graphics.beginFill(0xffffff);
      this.graphics.drawCircle(planet.x, planet.y, planet.radius);
      this.graphics.endFill();
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
      var x = mortal.body.position.x - mortal.spriteParams.width / 2,
        y = mortal.body.position.y - mortal.spriteParams.height;
        width = mortal.spriteParams.width * mortal.getHealthAsPercent() / 100;

      this.graphics.lineStyle(2, 0xffffff);
      this.graphics.moveTo(x, y);
      this.graphics.lineTo(x + width, y);
    },

    drawEntity: function(entity) {
      if (typeof entity === 'undefined' || !(entity instanceof Entity)) return false;

      var sprite = entity.sprite,
          angle = entity.getAngle(),
          x = 0,
          y = 0;

      var s = entity.getSprite();
      if (typeof s === 'undefined') {
        s = PIXI.Sprite.fromFrame('ship/inactive.png');
        entity.setPixiSprite(s);
        this.stage.addChild(s);
      }

      var pose = entity.getPose();
      s.texture = PIXI.Sprite.fromImage(pose).texture;

      if (entity.alive === false) {
        this.stage.removeChild(s);
        entity.setPixiSprite();
      } else {
        s.position.x = entity.body.position.x;
        s.position.y = entity.body.position.y;
        s.height = entity.spriteParams.height;
        s.width = entity.spriteParams.width;
        s.anchor.x = 0.5;
        s.anchor.y = 0.5;
        s.rotation = (angle * Math.PI) / 180;
      }
    },

    drawGraphics: function() {
      var self = this;

      _.each(this.components, function(component) {
        var c = component.render();
        if (c) {
          self.graphics.addChild(c);
        }
      });
    },

    addToUi: function(component) {
      this.components.push(component);
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
