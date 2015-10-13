angular.module('duplexdots.directives', []).
directive("duplexdotscanvas", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      console.log(element.width, element.height);
      var ctx = element[0].getContext('2d');
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      // variable that decides if something should be drawn on mousemove
      var drawing = false;

      // the last coordinates before the current move
      var lastX;
      var lastY;

      element.bind('touchstart', function(event){
        console.log('start');
        lastX = event.changedTouches[0].pageX;
        lastY = event.changedTouches[0].pageY;

        // begins new line
        ctx.beginPath();

        drawing = true;
      });
      element.bind('touchmove', function(event){
        console.log('move');
        if(drawing){
          // get current mouse position
          for(var t in event.changedTouches) {
            currentX = event.changedTouches[t].pageX;
            currentY = event.changedTouches[t].pageY;
            draw(lastX, lastY, currentX, currentY);

            // set current coordinates to last one
            lastX = currentX;
            lastY = currentY;
          }
        }

      });
      element.bind('touchend', function(event){

        console.log('end');
        // stop drawing
        drawing = false;
      });

      // canvas reset
      function reset(){
        element[0].width = element[0].width;
      }

      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = "#4bf";
        // draw it
        ctx.stroke();
      }

    }
  };
});
