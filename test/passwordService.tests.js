describe('codemill.oauth2.cmOauth2PasswordService', function () {
  var service, httpBackend, exceptionHandler, scope;

  beforeEach(module('codemill.oauth2'));

  beforeEach(module(function($provide) {
    $provide.service('Oauth2', function() {
      this.getConfig = function () {
        return {
          password: {
            uri: '/auth',
            clientId: 'test'
          }
        };
      };
    });
  }));

  beforeEach(module(function($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(inject(function(_cmOauth2PasswordService_, $httpBackend, $exceptionHandler, _$rootScope_) {
    service = _cmOauth2PasswordService_;
    httpBackend = $httpBackend;
    exceptionHandler = $exceptionHandler;
    scope = _$rootScope_;
  }));

  it('should be successful', function() {
    httpBackend.whenPOST('/auth', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(200, '{ "access_token" : "token" }');

    var handler = jasmine.createSpy('success');
    service.login("username", "password").then(handler);
    httpBackend.flush();
    scope.$digest();
    expect(handler).toHaveBeenCalledWith({ access_token : 'token' });
  });

  it('should fail with connection failure', function() {
    httpBackend.whenPOST('/auth', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(400);

    service.login("username", "password");
    httpBackend.flush();
    scope.$digest();
    expect(exceptionHandler.errors).toEqual(['Failed contacting authentication server']);
  });

  it('should fail with user not found', function() {
    httpBackend.whenPOST('/auth', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(404, { error_description : 'NotFound' });

    service.login("username", "password");
    httpBackend.flush();
    scope.$digest();
    expect(exceptionHandler.errors).toEqual(['User not found']);
  });

  it('should fail with wrong password', function() {
    httpBackend.whenPOST('/auth', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(404, { error_description : 'BadRequest' });

    service.login("username", "password");
    httpBackend.flush();
    scope.$digest();
    expect(exceptionHandler.errors).toEqual(['Wrong password']);
  });


  it('should fail with wrong password', function() {
    httpBackend.whenPOST('/auth', 'grant_type=password&client_id=test&username=username&password=password')
      .respond(500, { error_description : 'Internal Server Error' });

    service.login("username", "password");
    httpBackend.flush();
    scope.$digest();
    expect(exceptionHandler.errors).toEqual(['Login failed for unknown reason']);
  });

});
