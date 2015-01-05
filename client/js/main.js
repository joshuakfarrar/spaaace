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

      $('body').unbind('click');
      $('body').click(function(event) {
        if (game.started) {
          game.click();
        }
      });

      // $(document).bind("keydown", function(e) {
      //   var key = e.which,

      //   if($('#chatinput:focus').size() == 0 && $('#nameinput:focus').size() == 0) {
      //     if(key === 13) { // Enter
      //       if(game.ready) {
      //         $chat.focus();
      //         return false;
      //       }
      //     }
      //     if(key === 32) { // Space
      //       // game.togglePathingGrid();
      //       return false;
      //     }
      //     if(key === 70) { // F
      //       // game.toggleDebugInfo();
      //       return false;
      //     }
      //     if(key === 27) { // ESC
      //       app.hideWindows();
      //       _.each(game.player.attackers, function(attacker) {
      //         attacker.stop();
      //       });
      //       return false;
      //     }
      //     if(key === 65) { // a
      //       // game.player.hit();
      //       return false;
      //     }
      //   } else {
      //     if(key === 13 && game.ready) {
      //       $chat.focus();
      //       return false;
      //     }
      //   }
      // });
    });
  }

  initApp();
});