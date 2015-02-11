define(function() {
  var App = Class.extend({
    setGame: function(game) {
      this.game = game;
      this.ready = true;
    },

    center: function() {
      window.scrollTo(0, 1);
    }
  });

  return App;
});