define(['areas/circular', 'bot', 'ships/reaper', 'physics/point', 'physics/circle', 'physics/body'], function(CircularArea, Bot, Reaper, Point, Circle, Body) {
  var Planet = Class.extend({
    init: function(game, params) {
      this.game = game;

      this.defensesActivated = false;

      this.name = params.name;
      this.x = params.x;
      this.y = params.y;
      this.radius = params.radius;

      this.hostile = params.hostile;

      this.setupAreas();
    },

    setupAreas: function() {
      this.area = new CircularArea(this.x, this.y, this.radius * 2, this.event.bind(this));
    },

    event: function() {
      throw new Error("Event handler not implemented for planet " + name + "!");
    },

    activateDefenses: function() {
      if (this.defensesActivated) {
        return false;
      } else{
        this.defensesActivated = true;
      }

      console.log("Welcome to Planet " + this.name.substr(0, 1).toUpperCase() + this.name.substr(1) + ". Prepare to be slaughtered!");

      var captains = ["April", "Thomas", "Mal", "Joshie", "Jack Sparrow"],
          ships = ["The Coldies", "Swamp", "Serenity", "The Warmies", "The Black Pearl"];

      var last = this.game.player.getShip();

      for (var i = 0; i < 5; i++) {
        var x = (i + 1) * 100,
            y = (i + 1) * 100;

        var bot = new Bot('bot', captains[i % 5], this.game);
        var ship = new Reaper(bot, ships[i % 5]);

        var body = new Body();

        body.setMaxSpeed(ship.MAX_SPEED);

        ship.setBody(body);
        ship.setPosition(new Point(x, y));
        ship.setAngle(45);

        bot.setShip(ship);

        bot.target(last);

        if (i % 2) bot.aggressive = true;

        last = bot.getShip();

        this.game.addCharacter(bot);
      }
    }
  });

  return Planet;
});