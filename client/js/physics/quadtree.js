/*
  Mike Chambers: http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/
  Steven Lambert: http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
*/
define(function() {
  var Quadtree = Class.extend({
    init: function(bounds) {
      this.root = new Node(bounds);
    },

    clear: function() {
      this.root.clear();
    },

    insert: function(item) {
      if (!item) return false;

      // don't detect collisions for items out of bounds
      if (this._outOfBounds(item)) return false;

      if (item instanceof Array) {
        for (var i = 0, len = item.length; i < len; i++) {
          this.root.insert(item[i]);
        }
      } else {
        this.root.insert(item);
      }
    },

    retrieve: function(item) {
      if (this._outOfBounds(item)) return false;

      return this.root.retrieve(item);
    },

    _outOfBounds: function(item) {
      if (item.position.x < this.root._bounds.x ||
          item.position.y < this.root._bounds.y ||
          item.position.x > this.root._bounds.width ||
          item.position.y > this.root._bounds.height) return true;

        return false;
    }
  });

  var Node = Class.extend({
    init: function(bounds, depth) {
      this._MAX_DEPTH    = 8;
      this._MAX_CHILDREN = 4;

      this.TOP_LEFT      = 0;
      this.TOP_RIGHT     = 1;
      this.BOTTOM_LEFT   = 2;
      this.BOTTOM_RIGHT  = 3;

      this.children = [];
      this.nodes = [];

      this._bounds = bounds;
      this._depth = depth || 0;
    },

    clear: function() {
      this.children.length = 0;

      for (var i = 0, len = this.nodes.length; i < len; i++) {
        this.nodes[i].clear();
      }

      this.nodes.length = 0;
    },

    insert: function(item) {
      if (this.nodes.length) {
        var index = this._getIndex(item);

        this.nodes[index].insert(item);

        return;
      }

      this.children.push(item);

      var len = this.children.length;
      if (!(this._depth >= this._MAX_DEPTH) &&
                len > this._MAX_CHILDREN) {

        this.subdivide();

        for (var i = 0; i < len; i++ ) {
          this.insert(this.children[i]);
        }

        this.children.length = 0;
      }
    },

    subdivide: function() {
      var depth = this._depth + 1;

      var bx = this._bounds.x;
      var by = this._bounds.y;

      var b_w_h = (this._bounds.width / 2) | 0;
      var b_h_h = (this._bounds.height / 2) | 0;
      var bx_b_w_h = bx + b_w_h;
      var by_b_h_h = by + b_h_h;

      //top left
      this.nodes[this.TOP_LEFT] = new Node({
          x: bx,
          y: by,
          width: b_w_h,
          height: b_h_h
      }, depth);

      //top right
      this.nodes[this.TOP_RIGHT] = new Node({
          x: bx_b_w_h,
          y: by,
          width: b_w_h,
          height: b_h_h
      }, depth);

      //bottom left
      this.nodes[this.BOTTOM_LEFT] = new Node({
          x: bx,
          y: by_b_h_h,
          width: b_w_h,
          height: b_h_h
      }, depth);

      //bottom right
      this.nodes[this.BOTTOM_RIGHT] = new Node({
          x: bx_b_w_h,
          y: by_b_h_h,
          width: b_w_h,
          height: b_h_h
      }, depth);
    },

    retrieve: function(item) {
      if (this.nodes.length) {
        var index = this._getIndex(item);

        return this.nodes[index].retrieve(item);
      }

      return this.children;
    },

    _getIndex: function(item) {
      var b = this._bounds;

      var left = (item.position.x > b.x + b.width / 2) ? false : true;
      var top = (item.position.y > b.y + b.height / 2) ? false : true;

      var index = this.TOP_LEFT;
      if (left) {
        //left side
        if (!top) {
          //bottom left
          index = this.BOTTOM_LEFT;
        }
      } else {
        //right side
        if (top) {
          //top right
          index = this.TOP_RIGHT;
        } else {
          //bottom right
          index = this.BOTTOM_RIGHT;
        }
      }

      return index;
    }
  });

  return Quadtree;
});
