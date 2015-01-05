define(['jquery', 'app'], function($, App) {
  var app, game;

  var initApp = function() {
    $(document).ready(function() {
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
    });
  }

  initApp();
});