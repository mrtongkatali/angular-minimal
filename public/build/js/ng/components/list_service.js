appServices.factory('PublicJsonFactory', function(Restangular) {
   return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('json/');
   });
})

appServices.service('ListService', ['$rootScope','PublicJsonFactory',
	function($rootScope, PublicJsonFactory){
     var self = this;

		self.retrieveCountryList = function() {
			return PublicJsonFactory.all('countries.json').getList();
		};

    self.retrieveMaritalStatusList = function() {
			return PublicJsonFactory.all('marital.json').getList();
		};

    self.retrieveAllCurrencies = function() {
			return PublicJsonFactory.all('currency.json').getList();
		};

    self.retrieveAllPoids = function() {
			return PublicJsonFactory.all('poid.json').getList();
		};

    self.retrieveAllTapDevices = function() {
			return PublicJsonFactory.all('tapdevices.json').getList();
		};

    self.retrieveAllPrivilegeCardIssuer = function() {
			return PublicJsonFactory.all('privilegecardissuer.json').getList();
		};

    self.retrieveAllPreviousDates = function() {
			return PublicJsonFactory.all('previousdates.json').getList();
		};
}])
