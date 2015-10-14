angular.module('duplexdots.controllers', [])

.controller('Canvas', ['$scope', 'Objects', 'Socket', function($scope, Objects, Socket) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  var me = {
    id: Math.round(Math.random()*1000),
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
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
  };
  console.log(Objects);
  Objects.add(me);
  console.log(me);
  $scope.$on('$ionicView.enter', function(e) {

  });
  $scope.$on('duplexdots.move', function(e, pos){
    me.x = pos.x;
    me.y = pos.y;
  });
  $scope.$on('duplexdots.moveOther', function(e, object){
    if(o = Objects.get(object.id)){
      o.x = object.x;
      o.y = object.y;
    } else {
      Objects.add(object);
    }
  });

  Socket.addOnMessageHandler(function(event){
    $scope.$broadcast('duplexdots.moveOther', data);
  });
    console.log('test');
}]);
