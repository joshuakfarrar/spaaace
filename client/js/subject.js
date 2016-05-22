define(['observer'], function(Observer) {
  return Class.extend({
    init: function() {
      this.observers = [];
    },

    addObserver: function(observer) {
      if (! observer instanceof Observer) return false;
      this.observers.push(observer);
    },

    notify: function(event) {
      _.each(this.observers, function(observer) {
        observer.onNotify(event);
      });
    }
  });
});
