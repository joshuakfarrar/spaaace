define(['jquery'], function($) {
  var opts;
  var app, game;

  function main(args) {
    opts = args || {};

    initApp()
      .then(loadGameConfiguration)
      .then(initGame);
  }

  function initApp() {
    return new Promise(function(resolve, reject) {
      $(document).ready(function() {
        var klass = opts.app || 'core/game/app';
        require([klass], function(App) {
          app = new App();
          app.center();
          resolve();
        });
      });
    });
  }

  function loadGameConfiguration() {
    return new Promise(function(resolve, reject) {
      $.getJSON('/map', function(data) {
        resolve(data);
      });
    });
  }

  function initGame(data) {
    var klass = opts.game || 'core/game/game';
    require([klass], function(Game) {
      game = new Game(app);
      app.setGame(game);
      game.setup($(window).width(), $(window).height());
      game.loadMap();

      game.run(data);

      $(document).bind("keydown", function(event) {
        game.input.processKeyDown(event);
      });
      $(document).bind("keyup", function(event) {
        game.input.processKeyUp(event);
      });

    });
  }

  return main;
});
