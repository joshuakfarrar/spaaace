define(['../game/app'], function(App) {
  return App.extend({
    setGame: function(game) {
      this._super(game);

      $(document).on('click', function(e) {
        game.handleClick(e);
      });
    }
  });
});
