// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'spec/*_spec.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
}
