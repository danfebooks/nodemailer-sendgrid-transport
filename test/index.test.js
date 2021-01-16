var sgTransport = require('../src/index.js');
var expect = require('chai').expect;

var pkg = require('../package.json');

var transport = null;

describe('sendgrid-transport', function() {
  it('should take an apikey', function() {
    transport = sgTransport({
      'auth': {
        api_key: 'SG.test'
      }
    })
  });

  it('should have a name and version', function() {
    expect(transport.name).to.eq('SendGrid')
    expect(transport.version).to.eq(pkg.version)
  });
});