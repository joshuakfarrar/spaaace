define(['subject'], function(Subject) {
  return Subject.extend({
    init: function(params) {
      this._super();
      this.width = params.width;
      this.height = params.height;

      this.renderer = new PIXI.autoDetectRenderer(screen.width, screen.height, {
        backgroundColor: params.background,
        antialias: true,
        clearBeforeRender: false
      });

      document.getElementById('canvas').appendChild(this.renderer.view);
    },

    getRenderer: function() {
      return this.renderer;
    },

    resize: function(width, height) {
      this.width = width;
      this.height = height;
      this.renderer.view.style.width = width + 'px';
      this.renderer.view.style.height = height + 'px';
      this.renderer.resize(width, height);
      this.notify({ type: 'SCREEN_RESIZED', width: width, height: height });
    }
  });
})
