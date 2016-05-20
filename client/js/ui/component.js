define(function() {
  return Class.extend({
    init: function(props) {
      this.props = props;
      this.children = [];
    },

    propertiesHaveNotChanged: function() {
      return this.rendered;
    }
  });
});
