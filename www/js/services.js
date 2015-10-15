angular.module('duplexdots.services', [])

.factory('Objects', function() {
  var objects = [];

  return {
    all: function() {
      return objects;
    },
    remove: function(object) {
      objects.splice(objects.indexOf(object), 1);
    },
    get: function(objectId) {
      for (var i = 0; i < objects.length; i++) {
        if (objects[i].id === parseInt(objectId)) {
          return objects[i];
        }
      }
      return null;
    },
    add: function(object) {
      objects.push(object);
    },
    baseObject: {
      draw: function(context){
        context.beginPath();
        context.arc(this.dx, this.dy, 10, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#003300';
        context.stroke();
      },
      tick: function(){
        this.dx = this.x;
        this.dy = this.y;
      }
    }
  };
}).factory('Socket', function(){
    var ws = new WebSocket("ws://04f75e9f.ngrok.io");

    var handlers = [];

    ws.onmessage = function(event){
      for(var h in handlers){
        handlers[h](event);
      }
    };

    return {
      send: function(data){
        ws.send(JSON.stringify(data));
      },
      addOnMessageHandler: function(handler){
        handlers.push(handler);
      }
    }
});
