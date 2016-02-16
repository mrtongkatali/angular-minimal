var appControllers = angular.module('appControllers', []);


appControllers.controller('demoCtrl', ['$scope',
  function($scope) {

    $scope.input = {
      'first'   : "Input 1",
      'second'  : "Input 2",
    };
}]);
