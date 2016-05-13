define(['entity', 'physics/point'], function(Entity, Point) {
  return Class.extend({
    init: function(renderer) {
      this.renderer = renderer;
    },

    getFocus: function() {
      var x, y,
        target = this.lookingAt.getPosition(),
        renderer = this.renderer,
        screen = renderer.getScreen();

      var x = (target.x < screen.width / 2) ? 0 : -target.x + screen.width / 2;
      x = (-x > renderer.MAX_WIDTH - screen.width) ? -renderer.MAX_WIDTH + screen.width : x;
      var y = (target.y < screen.height / 2) ? 0 : -target.y + screen.height / 2;
      y = (-y > renderer.MAX_HEIGHT - screen.height) ? -renderer.MAX_HEIGHT + screen.height : y;

      return { x: x, y: y };
    },

    lookAt: function(thing) {
      if (!this.canBeTargeted(thing)) return false

      this.lookingAt = thing;
    },

    canBeTargeted: function(targetable) {
      if ((targetable instanceof Entity) ||
          (targetable instanceof Point)) return true
      else return false;
    }
  });
});
