define(['ui/component'], function(Component) {
  return Component.extend({
    onHover: function(hit) {
      if (!((this.props.active || hit) && !(this.props.active && hit))) return false;
      else {
        // if the label is newly active or inactive, set state, and reset the
        // backgrounds of all labels attached to the parent menu
        this.props.active = hit;

        var background = (hit) ? this.props.style.activeBackgroundColor : this.props.style.backgroundColor;
        this.outline.clear();
        this.outline = this.drawBackground(this.text, background, this.outline);
      }
    },

    onClick: function() {
      console.log("click!");
    },

    drawBackground: function(text, color, graphics) {
      var self = this;
      return (function(props) {
        graphics.lineStyle(props.border.width, props.border.color);
        graphics.beginFill(props.background);
        graphics.drawRect(props.x, props.y, props.width, props.height);
        graphics.endFill();
        graphics.drawRect(props.x, props.y, props.width, props.height);
        graphics.hitArea = new PIXI.Rectangle(props.x, props.y, props.width, props.height);
        graphics.interactive = true;
        graphics.onClick = self.onClick.bind(self);
        graphics.onHover = self.onHover.bind(self);
        return graphics;
      }({
        x: text.x - 15,
        y: text.y - 6,
        width: text.width + 30,
        height: text.height + 10,
        background: color,
        border: this.props.style.border
      }));
    },

    render: function() {
      var button = new PIXI.Container();

      var x = this.props.position.x;
      var y = this.props.position.y;

      var optionsText = {
        font: this.props.style.font,
        fill: this.props.style.color
      }

      var text = new PIXI.Text(this.props.text, optionsText);
      if (typeof x === 'function') {
        text.x = x.call(this, text);
      } else {
        text.x = x;
      }
      text.y = y;
      text.scale.x = 0.5;
      text.scale.y = 0.5;
      this.text = text;

      var graphics = new PIXI.Graphics();
      this.outline = this.drawBackground(text, this.props.style.backgroundColor, graphics);

      button.addChild(this.outline);
      button.addChild(this.text);

      return button;
    }
  });
});
