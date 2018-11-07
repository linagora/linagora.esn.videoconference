'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The VideoConfWebsocketMessengerService factory', function() {
  var user, domain, session;
  var VideoConfWebsocketTransportService, VideoConfWebsocketMessengerService;
  var instanceSpy;

  beforeEach(function() {
    instanceSpy = sinon.spy();
    VideoConfWebsocketTransportService = function(options) {
      instanceSpy(options);
    };
    user = { _id: '123' };
    domain = { _id: '456' };
    session = { user: user, domain: domain };
  });

  beforeEach(function() {
    module('linagora.esn.videoconference', function($provide) {
      $provide.value('VideoConfWebsocketTransportService', VideoConfWebsocketTransportService);
      $provide.value('session', session);
    });
  });

  beforeEach(angular.mock.inject(function(_VideoConfWebsocketMessengerService_) {
    VideoConfWebsocketMessengerService = _VideoConfWebsocketMessengerService_;
  }));

  describe('The get function', function() {
    it('should return a VideoConfWebsocketTransportService instance', function() {
      expect(VideoConfWebsocketMessengerService.get()).to.be.an.instanceof(VideoConfWebsocketTransportService);
      expect(instanceSpy).to.have.been.calledWith({ room: session.user._id });
    });

    it('should always return the same VideoConfWebsocketTransportService instance', function() {
      var instance1 = VideoConfWebsocketMessengerService.get();
      var instance2 = VideoConfWebsocketMessengerService.get();

      expect(instanceSpy).to.have.been.calledOnce;
      expect(instance1).to.equal(instance2);
    });
  });
});
