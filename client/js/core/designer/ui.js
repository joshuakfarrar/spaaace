define(['../game/ui', '../../ui/button'], function(UI, Button) {
  return UI.extend({
    render: function() {
      var self = this,
        renderer = this.props.renderer;

      var saveButton = new Button({
        position: {
          x: function(text) {
            return (self.props.screen.width - text.width / 2) - 30;
          },
          y: 15
        },
        text: "Save",
        style: {
          font: "bold 24px Comfortaa",
          color: renderer.COLORS.WHITE,
          backgroundColor: renderer.COLORS.BLACK,
          activeBackgroundColor: renderer.COLORS.TEAL,
          border: {
            width: 1,
            color: renderer.COLORS.TEAL
          }
        }
      });
      this.addComponentToUi(saveButton);
    }
  });
});
