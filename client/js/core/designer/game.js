define(['../game/game', '../../planets/earth'], function(Game, Earth) {
  var Designer = Game.extend({
    handleClick(e) {
      // this.fireBullet(this.player);
      this.addPlanet({
        name: 'whatevs',
        x: 700,
        y: 700,
        radius: 50,
        hostile: false
      })
    },

    addPlanet(params) {
      this.map.addPlanet(new Earth(this, params))
    }
  });
  return Designer;
});
