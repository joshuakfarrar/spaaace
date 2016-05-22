define(['ui/component'], function(Component) {
  return Component.extend({
    // update: function(renderer) {
      // console.log("update!");
    // },

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

      var outline = (function(props) {
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(props.border.width, props.border.color);
        graphics.drawRect(props.x, props.y, props.width, props.height);
        return graphics;
      }({
        x: text.x - 15,
        y: text.y - 6,
        width: text.width + 30,
        height: text.height + 10,
        border: this.props.style.border
      }));

      button.addChild(outline);
      button.addChild(text);

      return button;
    }
  });
});
