define(['renderer', 'updater', 'player', 'sprite', 'entity', 'input', 'map', 'physics'],
 function(Renderer, Updater, Player, Sprite, Entity, Input, Map, Physics) {
  var Game = Class.extend({
    init: function(app) {
      this.app = app;
      this.ready = false;
      this.started = false;
      this.hasNeverStarted = true;
 
      this.player = new Player("player", "Joshua", this);

      this.sprites = {};
      this.entities = {};

      this.spriteNames = ["ship"];
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

    run: function() {
      var self = this;

      this.loadSprites();
      this.setUpdater(new Updater(this));
      this.setInput(new Input(this));
      this.setPhysics(new Physics(this));
      this.camera = this.renderer.camera;

      var wait = setInterval(function() {
        if (self.spritesLoaded()) {

          self.initAreas();
          self.initPlayer();
          self.addEntity(self.player);

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
      this.player.setSprite(this.sprites[this.player.getSpriteName()]);
      this.physics.enable(this.player);
    },

    initAreas: function() {
      var self = this;

      this.map.addArea(0, 0, 200, 200);
    },

    addEntity: function(entity) {
      if(this.entities[entity.id] === undefined) {
        this.entities[entity.id] = entity;
      }
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