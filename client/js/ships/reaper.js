define(['ship', 'physics/point'], function(Ship, Point) {
  var Reaper = Ship.extend({
    init: function(captain, name) {
      this._super(name);

      this.MAX_SPEED = 3;
      this.ROTATION_SPEED = 2;
      this.ACCELERATION = .05;

      this.spriteParams = {
        name: "ship",
        width: 32,
        height: 32,
        radius: 20
      };

      // console.log(captain.name + " is now commanding the Reaper-class ship '" + this.name + "'!");
    },

    getGunPosition: function() {
      var x = this.body.position.x + (this.spriteParams.radius * Math.cos(this.body.angle * (Math.PI / 180))),
          y = this.body.position.y + (this.spriteParams.radius * Math.sin(this.body.angle * (Math.PI / 180)));

      return new Point(x, y);
    }
  });

  return Reaper;
});