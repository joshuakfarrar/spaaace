define(['ui/component'], function(Component) {
  return Component.extend({
    resetHighlight: function() {
        if (this.props.active) return this.highlight();
        else return this.unhighlight();
    },

    highlight: function() {
      var color = this.props.style.activeBackgroundColor;
      this.background.clear();
      this.background = this.drawBackground(color, this.background);
    },

    unhighlight: function() {
      var color = this.props.style.backgroundColor;
      this.background.clear();
      this.background = this.drawBackground(color, this.background);
    },

    onClick: function() {
      this.props.onClick(this.parent.props.position);
    },

    onHover: function(hit) {
      // check if the current state of a label is different than its hit state
      if (!((this.props.active || hit) && !(this.props.active && hit))) return false;
      else {
        // if the label is newly active or inactive, set state, and reset the
        // backgrounds of all labels attached to the parent menu
        this.props.active = hit;
        this.props.resetHighlights();
      }
    },

    drawBackground: function(color, g) {
      var graphics = g || new PIXI.Graphics();
      var x = this.props.position.x;
      var y = this.props.position.y;

      graphics.id = this.props.id;
      graphics.beginFill(color);
      graphics.drawRect(x, y, 300, 20);
      graphics.endFill();
      graphics.hitArea = new PIXI.Rectangle(x, y + 3, 300, 20);

      graphics.interactive = true;
      graphics.onClick = this.onClick.bind(this);
      graphics.onHover = this.onHover.bind(this);
      return graphics;
    },

    drawLabelText: function() {
      var x = this.props.position.x;
      var y = this.props.position.y;

      var optionsText = {
        font: this.props.style.font,
        fill: this.props.style.color
      }

      var text = new PIXI.Text(this.props.label, optionsText);
      text.x = x + this.props.style.paddingLeft;
      text.y = y + 2;
      text.scale.x = 0.5;
      text.scale.y = 0.5;

      return text;
    },

    render: function() {
      var label = new PIXI.Container();

      var backgroundColor = (this.props.active)
        ? this.props.style.activeBackgroundColor
        : this.props.style.backgroundColor;

      this.background = this.drawBackground(backgroundColor);
      this.text = this.drawLabelText();

      label.addChild(this.background);
      label.addChild(this.text);

      this.component = label;

      return label;
    }
  });
});
