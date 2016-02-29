angular
    .module('ngResource')
    .config([
        '$provide',
        '$httpProvider',
        ngResourceConfig
    ]);

function ngResourceConfig($provide, $httpProvider) {
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

    $provide.factory('resourceEnforceSlashInterceptor', function() {
        return {
            request: function(config) {
                config.url = config.url.replace(/[\/\\]+$/, '/');
                return config;
            }
        };
    });

    $provide.factory('httpQueueInterceptor', ['$q', function($q) {
        var _queue = [];

        // if you want your requests to be queued add them here
        var requestorsToBeQueued = [
            'sensor-widget'
        ];

        function _shiftAndExecuteTop() {
            setTimeout(function() {
                _queue.shift();

                if (_queue.length > 0) {
                    _queue[0]();
                }
            }, 0);
        }

        return {
            request: function(config) {
                if (config.params && requestorsToBeQueued.indexOf(config.params.requestor) > -1) {
                    var deferred = $q.defer();
                    _queue.push(function() {
                        deferred.resolve(config);
                    });

                    if (_queue.length === 1) {
                        _queue[0]();
                    }

                    return deferred.promise;
                } else {
                    return config;
                }
            },
            response: function(response) {
                if (response.config && response.config.params && requestorsToBeQueued.indexOf(response.config.params.requestor) > -1) {
                    _shiftAndExecuteTop();
                }
                return response;
            },
            responseError: function(responseError) {
                if (responseError.config && responseError.config.params && requestorsToBeQueued.indexOf(responseError.config.params.requestor) > -1) {
                    _shiftAndExecuteTop();
                }
                return $q.reject(responseError);
            }
        };
    }]);

    $httpProvider.interceptors.push('resourceEnforceSlashInterceptor');
    $httpProvider.interceptors.push('httpQueueInterceptor');
}


var app = angular.module('App', [
    'ui.router',
    'ngResource',
    'appServices',
    'appControllers',
]);

app.config(function($stateProvider, $urlRouterProvider){

     // For any unmatched url, send to /route1
     $urlRouterProvider.otherwise("/route1")

     $stateProvider
       .state('route1', {
           url: "/route1",
           templateUrl: "public/partials/demo/demo3.html"
       })
         .state('route1.list', {
             url: "/list",
             templateUrl: "public/partials/demo/demo3.list.html"
         })
       .state('route2', {
           url: "/route2",
           templateUrl: "public/partials/demo/demo4.html"
       })
       .state('route2.list', {
           url: "/list",
           templateUrl: "public/partials/demo/demo4.list.html"
       })
});
