define(['physics/point'], function(Point) {
  var Entity = Class.extend({
    init: function(id) {
      this.id = id;

      this.position = new Point(0, 0);

      this.sprite = null;

      this.alive = false;
    },

    collision: function(entity) {
      this.handleCollision(entity);
    },

    handleCollision: function(entity) {
      throw new Error("Entity hasn't been rigged to handle collisions.");
    },

    setBody: function(body) {
      this.body = body;
      this.body.entity = this;
    },

    setSprite: function(sprite) {
      this.sprite = sprite;

      this.sprite.width = this.spriteParams.width;
      this.sprite.height = this.spriteParams.height;

      this.sprite.offsetX = -(this.sprite.width / 2);
      this.sprite.offsetY = -(this.sprite.height / 2);
    },

    setPixiSprite: function(sprite) {
      this._sprite = sprite;
    },

    getSprite: function() {
      return this._sprite;
    },

    getSpriteName: function() {
      return this.spriteParams.name;
    },

    setPosition: function(point) {
      if (point instanceof Point) {
        this.body.position = point;
      }
    },

    getPosition: function() {
        if (this.body) return this.body
        else return false;
    },

    setAngle: function(angle) {
      this.body.angle = angle;
    },

    getAngle: function() {
      while (this.body.angle >= 180) {
        this.body.angle -= 360;
      }
      while (this.body.angle < -180) {
        this.body.angle += 360;
      }

      return this.body.angle;
    },

    getVelocity: function() {
      if (this.body && this.body.velocity) {
        return this.body.velocity;
      }
    },

    destroy: function() {
      this.alive = false;
      this.body.active = false;
    }
  });

  return Entity;
});
