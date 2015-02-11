define(['captain'], function(Captain) {
  var Bot = Captain.extend({
    tick: function() {
      this.accelerate();
      this.bankLeft();
    }
  });

  return Bot;
});