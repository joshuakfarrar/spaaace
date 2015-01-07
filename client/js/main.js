define(['jquery', 'app'], function($, App) {
  var app, game;

  var initApp = function() {
    $(document).ready(function() {
      app = new App();
      app.center();

      initGame();
    });
  }

  var initGame = function() {
    require(['game'], function(Game) {
      var canvas = document.getElementById("entities"),
        background = document.getElementById("background"),
        foreground = document.getElementById("foreground");

      game = new Game(app);
      game.setup(canvas, background, foreground);

      game.run();

      $(document).bind("keydown", function(event) {
        game.input.processKeyDown(event);
      });
      $(document).bind("keyup", function(event) {
        game.input.processKeyUp(event);
      });

    });
  }

  initApp();
});