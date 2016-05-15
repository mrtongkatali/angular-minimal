angular
    .module('ngResource')
    .config([
        '$provide',
        '$httpProvider',
        ngResourceConfig
    ]);

/** @ngInject */
function ngResourceConfig($provide, $httpProvider) {/** @ngInject */
    $provide.decorator('$resource', function($delegate) {
        return function() {
            if (arguments.length > 0) {  // URL
                arguments[0] = arguments[0].replace(/\/$/, '\\/');
            }

            if (arguments.length > 2) {  // Actions
                angular.forEach(arguments[2], function(action) {
                    if (action && action.url) {
                        action.url = action.url.replace(/\/$/, '\\/');
                    }
                });
            }

            return $delegate.apply($delegate, arguments);
        };
    });

    /** @ngInject */
    $provide.factory('resourceEnforceSlashInterceptor', function() {
        return {
            request: function(config) {
                config.url = config.url.replace(/[\/\\]+$/, '/');
                return config;
            }
        };
    });

    $httpProvider.interceptors.push('resourceEnforceSlashInterceptor');
}

var app = angular.module('App', [
    'daterangepicker',
    'angular-loading-bar',
    'ui.router',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.pinning',
    'ui.grid.pagination',
    'ui.grid.exporter',
    'ui.select',
    'ngFileUpload',
    'ngResource',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'restangular',
    'appServices',
    'appFilters',
    'appControllers',
])
.run(function ($rootScope, $state, $timeout, GlobalService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

    if(toState.authenticate) {
        //$state.transitionTo("login");
        return true;
    }

  });
});

var appServices = angular.module('appServices',[]);
var appFilters = angular.module('appFilters',[]);
var appControllers = angular.module('appControllers', []);

/* loader */
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"></div>';
  //cfpLoadingBarProvider.includeBar = false;
  cfpLoadingBarProvider.includeSpinner = false;
}]);

/** @ngInject */
app.config(function($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider){
   // For any unmatched url, send to /route1
   $urlRouterProvider.otherwise("/login")

   $stateProvider
     .state('/', {
        url: "/welcome",
        views: {
          "main": {
            controller: 'CompanyProfileCtrl',
            templateUrl: "public/partials/company.profile/index.html",
          }
        },
     })

     .state('signout', {
        url: "/signout",
        views: {
          "loginWrapper": {
            controller: function($rootScope, $state) {
              $state.transitionTo("login");
            },
            template: "",
          },
        }
     })
     .state('login', {
        url: "/login",
        views: {
          "loginWrapper": {
            controller: 'LoginCtrl',
            templateUrl: "public/partials/login/login.form.html",
          },
        }
     })
})
.run(function ($rootScope, GlobalService, $timeout) {
    $rootScope.sidenav = {
      parent    : '',
      selected  : '',
      location  : '',
      style     : {},
    };

    $rootScope.constants = {
      'pageTitle'       : '',
      'showMainWrapper' : false,
      'isAuthenticated' : false,
    };

    $rootScope.alert = [];
    $rootScope.throwAlertNotification = function(key, msg,label, showAlert) {
      $rootScope.alert[key] = {
        show: showAlert, msg:msg, label:label
      };
    };

    $rootScope.removeAlertNotification = function(key) {
      $rootScope.alert[key] = {};
    };

    $rootScope.removeAllAlertNotification = function() {
      $rootScope.alert = [];
    };

});
