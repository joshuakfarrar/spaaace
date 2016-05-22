define(function() {
  return Class.extend({
    onNotify: function(event) {
      throw new Error("Events not handled!");
    }
  });
});
