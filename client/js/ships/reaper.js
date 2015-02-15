define(['ship', 'point', 'vector'], function(Ship, Point, Vector) {
  var Reaper = Ship.extend({
    init: function(captain, name) {
      this._super(name);

      this.MAX_VELOCITY = new Vector(2, 2);
      this.ROTATION_SPEED = 2;
      this.ACCELERATION = .05;

      this.angle = -90;

      this.spriteParams = {
        name: "ship",
        width: 32,
        height: 32,
        radius: 16
      };

      // console.log(captain.name + " is now commanding the Reaper-class ship '" + this.name + "'!");
    },

    getGunPosition: function() {
      var x = this.body.position.x + (this.spriteParams.radius * Math.cos(this.angle * (Math.PI / 180))),
          y = this.body.position.y + (this.spriteParams.radius * Math.sin(this.angle * (Math.PI / 180)));

      return new Point(x, y);
    }
  });

  return Reaper;
});