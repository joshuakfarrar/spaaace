define(['../game/app'], function(App) {
  return App.extend({
    setGame: function(game) {
      this._super(game);

      $(document).on('click', function(e) {
        switch(e.which) {
          case 1:
            game.handleLeftClick(e.pageX, e.pageY);
            break;
          case 3:
            game.handleRightClick(e.pageX, e.pageY);
            break;
        }
      });

      $(document).on('mousemove', function(e) {
        game.handleMouseMove(e.pageX, e.pageY);
      });
    }
  });
});
