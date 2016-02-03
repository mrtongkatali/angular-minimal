var app = angular.module('App', [
    'ngRoute',
    'appControllers',
])

.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {

      //$locationProvider.html5Mode(true);
      //Enable cross domain calls
      //$httpProvider.defaults.useXDomain = true;

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
