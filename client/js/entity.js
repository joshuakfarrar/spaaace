define(['point'], function(Point) {
  var Entity = Class.extend({
    init: function(id) {
      this.id = id;

      this.position = new Point(0, 0);

      this.sprite = null;
    },

    setSprite: function(sprite) {
      this.sprite = sprite;

      this.sprite.width = this.spriteParams.width;
      this.sprite.height = this.spriteParams.height;

      this.sprite.offsetX = -(this.sprite.width / 2);
      this.sprite.offsetY = -(this.sprite.height / 2);
    },

    getSpriteName: function() {
      return this.spriteParams.name;
    },

    setPosition: function(point) {
      if (point instanceof Point) {
        this.position = point;
      }
    },

    setAngle: function(angle) {
      this.angle = angle;
    },

    getAngle: function() {
      while (this.angle >= 180) {
        this.angle -= 360;
      }
      while (this.angle < -180) {
        this.angle += 360;
      }

      return this.angle;
    }
  });

  return Entity;
});