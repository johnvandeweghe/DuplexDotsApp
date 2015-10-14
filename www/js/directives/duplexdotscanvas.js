angular.module('duplexdots.directives', ['duplexdots.services']).
directive("duplexdotscanvas", ['$compile', 'Objects', function($compile, Objects){
  return {
    restrict: "A",
    link: function($scope, element){
      console.log(element.width, element.height);
      var ctx = element[0].getContext('2d');
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      element.bind('touchstart', function(event){
        fireMove(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
      });
      element.bind('touchmove', function(event){
        for(var t in event.changedTouches) {
          var x = event.changedTouches[t].pageX;
          if(x) {
            fireMove(x, event.changedTouches[t].pageY);
          }
        }
      });
      element.bind('touchend', function(event){
      });

      var start = null;

      function step(timestamp) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var objects = Objects.all();
        for(var o in objects){
          objects[o].tick();
          objects[o].draw(ctx);
        }
        window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
      function fireMove(x, y){
        $scope.$broadcast('duplexdots.move', {x: x, y: y});
      }

    }
  };
}]);
