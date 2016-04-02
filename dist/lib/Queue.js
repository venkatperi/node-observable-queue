var EventEmitter, Queue,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventEmitter = require("events").EventEmitter;

module.exports = Queue = (function(_super) {
  __extends(Queue, _super);

  Object.defineProperty(Queue.prototype, 'length', {
    get: function() {
      return this.queue.length - this.offset;
    }
  });

  Object.defineProperty(Queue.prototype, 'isEmpty', {
    get: function() {
      return this.queue.length === 0;
    }
  });

  function Queue() {
    this.clear = __bind(this.clear, this);
    this.peek = __bind(this.peek, this);
    this.dequeue = __bind(this.dequeue, this);
    this.enqueue = __bind(this.enqueue, this);
    this.queue = [];
    this.offset = 0;
  }

  Queue.prototype.enqueue = function(item) {
    this.queue.push(item);
    return this.emit("enqueue");
  };

  Queue.prototype.dequeue = function() {
    var item;
    if (this.queue.length === 0) {
      return void 0;
    }
    item = this.queue[this.offset];
    if (++this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }
    this.emit("dequeue");
    return item;
  };


  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */

  Queue.prototype.peek = function() {
    if (this.queue.length > 0) {
      return this.queue[this.offset];
    } else {
      return void 0;
    }
  };

  Queue.prototype.clear = function() {
    this.queue = [];
    return this.offset = 0;
  };

  return Queue;

})(EventEmitter);
