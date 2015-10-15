angular.module('duplexdots.controllers', [])

.controller('Canvas', ['$scope', 'Objects', 'Socket', function($scope, Objects, Socket) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  var me = angular.extend({
    id: Math.round(Math.random()*1000),
    x: 0,
    y: 0,
    dx: 0,
    dy: 0
  }, Objects.baseObject);
  console.log(Objects);
  Objects.add(me);
  console.log(me);
  $scope.$on('$ionicView.enter', function(e) {

  });
  $scope.$on('duplexdots.move', function(e, pos){
    me.x = pos.x;
    me.y = pos.y;
    Socket.send(me);
  });

  Socket.addOnMessageHandler(function(event){
    var object = JSON.parse(event.data);
    if(o = Objects.get(object.id)){
      o.x = object.x;
      o.y = object.y;
    } else {
      Objects.add(angular.extend(object, Objects.baseObject));
    }
  });
}]);
