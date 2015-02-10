define(['planet'], function(Planet) {
  var Earth = Planet.extend({
    event: function() {
      this.activateDefenses();
    }
  });

  return Earth;
});