define(['ui/component', 'ui/label'], function(Component, Label) {
  return Component.extend({
    resetHighlights: function() {
      _.each(this.children, function(child) {
        child.resetHighlight();
      });
    },

    render: function() {
      if (this.propertiesHaveNotChanged()) return false;

      var self = this;
      var container = new PIXI.Container();

      var body = (function(props) {
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(props.border.width, props.border.color);
        graphics.drawRect(props.x, props.y, props.width, props.height);
        return graphics;
      }({
        x: this.props.position.x,
        y: this.props.position.y + 24,
        width: 300,
        height: this.props.options.length * 20,
        border: this.props.style.border
      }));

      var handle = (function(props) {
        var container = new PIXI.Container();

        var graphics = new PIXI.Graphics();
        graphics.beginFill(props.background);
        graphics.lineStyle(props.border.width, props.border.color);
        graphics.drawRect(props.x, props.y, props.width, props.height);
        graphics.endFill();

        var titleOptions = {
          font: "bold 28px Comfortaa",
          fill: props.color
        }
        var title = new PIXI.Text(self.props.title, titleOptions);
        title.x = props.x + 4;
        title.y = props.y + 3;
        title.scale.x = 0.5;
        title.scale.y = 0.5;

        container.addChild(graphics);
        container.addChild(title);
        return container;
      }({
        color: self.props.style.color,
        background: self.props.style.background,
        border: self.props.style.border,
        x: self.props.position.x,
        y: self.props.position.y,
        width: 300,
        height: 24
      }));

      container.addChild(handle);

      _.each(this.props.options, function(option, index) {
        var label = new Label({
          id: 'abc' + index,
          index: index,
          active: option.active,
          label: option.label,
          onClick: option.action || function() {},
          resetHighlights: self.resetHighlights.bind(self),
          style: {
            font: "24px Comfortaa",
            color: self.props.style.color,
            activeBackgroundColor: self.props.style.activeBackgroundColor,
            backgroundColor: self.props.style.background,
            paddingLeft: 4,
          },
          position: {
            x: self.props.position.x,
            y: self.props.position.y + 24 + index * 20
          }
        });
        label.parent = self;
        self.children.push(label);
        container.addChild(label.render());
      });

      container.addChild(body);

      this.rendered = true

      return container;
    }
  });
});
