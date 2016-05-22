define(['../../ui/component'], function(Component) {
  return Component.extend({
    init: function(props) {
      this._super(props);
      this.container = new PIXI.Container();
      this.render();
    },

    addComponentToUi: function(component) {
      this.container.addChild(component.render());
      this.children.push(component);
    },

    onNotify: function(event) {
      var self = this;
      switch(event.type) {
        case 'SCREEN_RESIZED':
          delete this.container;
          this.container = new PIXI.Container();
          _.each(this.children, function(child) {
            self.container.addChild(child.render());
          });
          break;
      }
    },

    render: function() {
    }
  });
});
