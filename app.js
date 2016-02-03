var app = angular.module('App', [
    'ngRoute',
    'appControllers',
])

.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
      $routeProvider
      .when('/', {
          templateUrl: 'public/partials/demo/demo.html',
          controller: 'demoCtrl'
      })
      .when('/contact/:domain?', {
          templateUrl: 'public/partials/demo/demo2.html',
          controller: 'demoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
