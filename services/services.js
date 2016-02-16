var appServices = angular.module('appServices',[]);

appServices.factory('GMapsGeoQuery', ['$resource', '$rootScope',
	function($resource, $rootScope){
		return $resource('http://maps.googleapis.com/maps/api/geocode/json', {}, {
  			get: {method: 'GET', params:{name : "roti+mediterranean+grill", radius: '500', types: 'food', address: '@address', sensor: false,}, isArray: false},
    	});
}]);
