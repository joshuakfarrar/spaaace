define(['renderer'], function(Renderer) {
  return Class.extend({
    init: function(params) {
      this.width = params.width;
      this.height = params.height;

      this.renderer = new PIXI.autoDetectRenderer(screen.width, screen.height, {
        backgroundColor: params.background,
        antialias: true
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
    }
  });
})
