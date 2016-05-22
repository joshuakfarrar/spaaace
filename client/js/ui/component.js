define(['observer'], function(Observer) {
  return Observer.extend({
    init: function(props) {
      this._super();
      this.props = props;
      this.children = [];
    },

    propertiesHaveNotChanged: function() {
      return this.rendered;
    },

    render: function() {
      throw new Error('Render function for components must be overridden!');
    }
  });
});
