define(['ship', 'physics/point'], function(Ship, Point) {
  var Reaper = Ship.extend({

    ROTATION_SPEED: 2,
    ACCELERATION: .05,
    MAX_SPEED: 10,
    MAX_HEALTH: 50,

    init: function(captain, name) {
      this._super(name);

      this.spriteParams = {
        name: "ship.old",
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
    },

    kill: function() {
      this.destroy();
    }
  });

  return Reaper;
});
