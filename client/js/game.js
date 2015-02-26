define(['renderer', 'updater', 'player', 'ships/reaper', 'bullet', 'planets/earth',
  'sprite', 'entity', 'input', 'map', 'physics', 'bulletManager', 'physics/body', 'physics/circle'],
 function(Renderer, Updater, Player, Reaper, Bullet, Earth,
  Sprite, Entity, Input, Map, Physics, BulletManager, Body, Circle) {
  var Game = Class.extend({
    init: function(app) {
      this.app = app;
      this.ready = false;
      this.started = false;
      this.hasNeverStarted = true;
 
      this.player = new Player("player", "Joshua", this);

      this.sprites = {};
      this.entities = [];
      this.bots = [];

      this.spriteNames = ["ship", "ball"];
    },

    setup: function(canvas, background, foreground) {
      this.setRenderer(new Renderer(this, canvas, background, foreground));
    },

    setInput: function(input) {
      this.input = input;
    },

    setRenderer: function(renderer) {
      this.renderer = renderer;
    },

    setUpdater: function(updater) {
      this.updater = updater;
    },

    setPhysics: function(physics) {
      this.physics = physics;
    },

    setBulletManager: function(bullets) {
      this.bullets = bullets;
    },

    run: function() {
      var self = this;

      this.loadSprites();
      this.setUpdater(new Updater(this));
      this.setInput(new Input(this));
      this.setPhysics(new Physics(this));
      this.setBulletManager(new BulletManager());

      var wait = setInterval(function() {
        if (self.spritesLoaded()) {

          self.initPlanets();
          self.initPlayer();
          self.initBullets();

          if(self.hasNeverStarted) {
            self.started = true;
            self.start();
          }
          clearInterval(wait);
        }
      }, 100);
    },

    loadMap: function() {
      this.map = new Map(this);
    },

    initPlayer: function() {
      if (this.player.setShip(new Reaper(this.player, "Kaylee"))) {
        this.player.ship.setSprite(this.sprites[this.player.ship.getSpriteName()]);

        var body = new Body()
          , circle = new Circle(this.player.ship.sprite.width / 2);

        body.setShape(circle);
        body.setMaxSpeed(this.player.ship.MAX_SPEED);

        this.player.ship.setBody(body);

        this.physics.enable(this.player.ship);
        this.addEntity(this.player.ship); 
      }
    },

    initPlanets: function() {
      var self = this;

      var earth = {
        name: 'Earth',
        x: 400,
        y: 400,
        radius: 100,
        hostile: true
      }

      this.map.addPlanet(new Earth(this, earth));
    },

    initBullets: function() {
      this.bullets.initBulletSprites(this.sprites);
    },

    addCharacter: function(character) {
      if (character && character.ship) {
        var ship = character.getShip();

        ship.setSprite(this.sprites[character.ship.getSpriteName()]);

        var circle = new Circle(ship.sprite.width / 2);
        ship.body.setShape(circle);

        this.physics.enable(ship);
        this.addEntity(ship);
        this.addBot(character);
      }
    },

    fireBullet: function(captain) {
      var ship = captain.getShip();

      var bulletParams = {
        position: ship.getGunPosition(),
        angle: ship.getAngle(),
        velocityOffset: ship.getVelocity()
      };

      try {
        var bullet = this.bullets.fire(bulletParams);
      } catch (e) {
        // console.log(e.message);
        return false;
      }

      this.physics.enable(bullet);
      this.addEntity(bullet);
    },

    addEntity: function(entity) {
      if (!entity.alive) {
        entity.alive = true;
        this.entities.push(entity);
      }
    },

    addBot: function(bot) {
      this.bots.push(bot);
    },

    pruneEntities: function() {
      for (var i = this.entities.length - 1; i >= 0; i--) {
        if (this.entities[i].alive === false) {
          this.entities.splice(i, 1);
        }
      }
    },

    pruneBots: function() {
      for (var i = this.bots.length - 1; i >= 0; i--) {
        var ship = this.bots[i].getShip();
        if (ship && ship.alive === false) {
          this.bots[i].onDestroy();
          this.bots.splice(i, 1);
        }
      }
    },

    forEachBot: function(callback) {
      _.each(this.bots, function(bot) {
        callback(bot);
      });
    },

    forEachEntity: function(callback) {
      _.each(this.entities, function(entity) {
        callback(entity);
      });
    },

    tick: function() {
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
      this.renderer.renderSpace();
      this.tick();
      this.hasNeverStarted = false;
    },

    stop: function() {
      this.isStopped = true;
    },

    loadSprites: function() {
      _.each(this.spriteNames, this.loadSprite, this);
    },

    loadSprite: function(name) {
      this.sprites[name] = new Sprite(name);
    },

    spritesLoaded: function() {
      if(_.any(this.sprites, function(sprite) { return !sprite.isLoaded; })) {
        return false;
      }
      return true;
    },

    forEachEntity: function(callback) {
      _.each(this.entities, function(entity) {
        callback(entity);
      });
    }
  });

  return Game;
});