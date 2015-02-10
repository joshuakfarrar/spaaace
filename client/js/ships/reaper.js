define(['ship'], function(Ship) {
  var Reaper = Ship.extend({
    init: function(captain, name) {
      this._super(name);

      this.MAX_VELOCITY = { x: 2, y: 2 };
      this.ROTATION_SPEED = 2;
      this.ACCELERATION = .05;

      this.angle = -90;

      this.spriteName = "ship";

      console.log(captain.name + " is now commanding the Reaper-class ship '" + this.name + "'!");
    }
  });

  return Reaper;
});