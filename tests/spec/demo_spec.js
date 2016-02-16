describe('Protractor Demo App', function() {

  var firstInput = element(by.model('input.first'));

  beforeEach(function() {
    browser.get('http://192.168.33.10/angular-minimal/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('AngularJS Minimal');
  });

  it('should be equal to Input 1', function() {
    expect(firstInput.getAttribute('value')).toEqual("Input 1");
  });

  it('should be accessible', function() {
    expect(firstInput.getAttribute('value')).toEqual("Input 1");
  });


});
