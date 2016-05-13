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
      $('canvas').on('contextmenu', function(e) {
        e.preventDefault();
      });
    },

    center: function() {
      window.scrollTo(0, 1);
    }
  });

  return App;
});
