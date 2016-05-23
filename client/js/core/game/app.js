define(function() {
  var App = Class.extend({
    setGame: function(game) {
      if (typeof game === 'undefined') {
        throw new Error("The app can't load without a game!");
      }
      this.game = game;
      this.ready = true;

      // prevent the page from scrolling when the player presses the space bar
      $(document).on('keydown', function(e) {
        if(e.keyCode == 32) {
          e.preventDefault();
          return false;
        }
      });

      // prevent context menus from showing up when the player right clicks
      $('#canvas').on('contextmenu', function(e) {
        game.handleRightClick(e.pageX, e.pageY);
        e.preventDefault();
      });

      $(document).on('click', function(e) {
        switch(e.which) {
          case 1:
            game.handleLeftClick(e.pageX, e.pageY);
            break;
        }
      });

      $(document).on('mousemove', function(e) {
        game.handleMouseMove(e.pageX, e.pageY);
      });

      $(window).on('resize', function(e) {
        var width = $(window).width();
        var height = $(window).height();
        game.resize(width, height);
      });
    },

    center: function() {
      window.scrollTo(0, 1);
    }
  });

  return App;
});
