describe('codemill.oauth2.cmOauth2PasswordService', function () {
  var service, httpBackend;

  beforeEach(module('codemill.oauth2'));
  beforeEach(module(function($provide) {
    $provide.constant('Oauth2', {
      password : {
        uri: 'http://test',
        clientId: 'test'
      }
    });
  }));
  beforeEach(inject(function(_cmOauth2PasswordService_, $httpBackend) {
    service = _cmOauth2PasswordService_;
    httpBackend = $httpBackend;
  }));

  it('should be successful', function() {
    httpBackend.expectPOST('http://test', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(200, '{ "access_token" : "token" }');

    service.login("username", "password")
      .then(function(data) {
        expect(data.access_token).toEqual('token');
      });
  });

  it('should fail with ', function() {
    httpBackend.expectPOST('http://test', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(200, '{ "access_token" : "token" }');

    service.login("username", "password")
      .then(function(data) {
        expect(data.access_token).toEqual('token');
      });
  });


});
