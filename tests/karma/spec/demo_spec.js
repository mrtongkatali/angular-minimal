describe('demoCtrl', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  it('should create "phones" model with 3 phones', inject(function($controller) {
      var $scope = {};
      var controller = $controller('demoCtrl', { $scope: $scope });
  }));
});
