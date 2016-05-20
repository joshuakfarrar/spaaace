define(['../game/game', '../../planets/earth', '../../ui/popup-menu'], function(Game, Earth, PopupMenu) {
  var Designer = Game.extend({
    handleMouseMove: function(x, y) {
      if (this.started) {
        this.mouse.setPosition({ x: x, y: y });
      }
    },

    handleRightClick: function(x, y) {
      var self = this;
      var p = this.renderer.positionFromClick(x, y);

      if (this.menu) return false;

      var menu = new PopupMenu({
        position: {
          x: -p.x,
          y: -p.y
        },
        title: 'Options',
        options: [
          {
            label: 'Add Planet',
            action: function addPlanetAt(position) {
              var earth = {
                name: 'Earth',
                x: position.x,
                y: position.y,
                radius: 50,
                hostile: false
              }
              self.addPlanet(earth);
            }
          },
          {
            label: 'Do Something'
          },
          {
            label: 'Rawr Kittens'
          }
        ],
        style: {
          color: this.renderer.COLORS.WHITE,
          background: this.renderer.COLORS.BLACK,
          activeBackgroundColor: this.renderer.COLORS.TEAL,
          border: {
            width: 1,
            color: this.renderer.COLORS.TEAL
          }
        }
      });
      this.openMenu(menu);
    },

    handleLeftClick: function() {
      this.mouse.click();
      // var p = this.renderer.positionFromClick(x, y);
      // var bodies = this.physics.getBodiesThatIntersectWith({ x: -p.x, y: -p.y });
      // _.each(bodies, function(body) {
      //   console.log(body.entity);
      // });
    },

    openMenu: function(menu) {
      this.menu = menu;
      this.renderer.addToUi(menu);
    },

    addPlanet(params) {
      this.map.addPlanet(new Earth(this, params))
    }
  });
  return Designer;
});
