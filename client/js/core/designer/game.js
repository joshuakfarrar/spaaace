define(['../game/game', '../../planets/earth', '../../ui/context-menu', '../../ui/button'], function(Game, Earth, ContextMenu, Button) {
  var Designer = Game.extend({
    init: function(app) {
      this._super(app);
    },

    ui: function() {
      var self = this;
      return new Promise(function(resolve, reject) {
        require(['core/designer/ui'], function(UI) {
          var ui = new UI({
            renderer: self,
            screen: self.screen
          });
          resolve(ui);
        });
      });
    },

    handleRightClick: function(x, y) {
      var self = this;
      var p = this.renderer.positionFromClick(x, y);

      if (this.menu) return false;

      var menu = new ContextMenu({
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
