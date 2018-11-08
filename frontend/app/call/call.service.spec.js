'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The VideoConfCallService factory', function() {
  var VIDEOCONFERENCE_EVENTS, session, $rootScope, VideoConfMessagingService, VideoConfCallService, VideoConfLaunchService;

  beforeEach(function() {
    VideoConfMessagingService = {
      sendMessage: sinon.spy()
    };

    VideoConfLaunchService = {
      openConference: sinon.spy()
    };

    session = {
      user: {
        _id: 'userId1'
      }
    };

    module('linagora.esn.videoconference', function($provide) {
      $provide.value('VideoConfMessagingService', VideoConfMessagingService);
      $provide.value('VideoConfLaunchService', VideoConfLaunchService);
      $provide.value('session', session);
    });
  });

  beforeEach(angular.mock.inject(function(_$q_, _$rootScope_, _VideoConfCallService_, _VIDEOCONFERENCE_EVENTS_) {
    $rootScope = _$rootScope_;
    VideoConfCallService = _VideoConfCallService_;
    VIDEOCONFERENCE_EVENTS = _VIDEOCONFERENCE_EVENTS_;
  }));

  describe('The call function', function() {
    it('should send a valid message', function() {
      var to = 'userId2';

      VideoConfCallService.call(to);
      $rootScope.$digest();

      expect(VideoConfMessagingService.sendMessage).to.have.been.calledWith('message', {
        from: session.user._id,
        id: 'userId1userId2',
        to: to,
        type: VIDEOCONFERENCE_EVENTS.INCOMING_CALL
      });
    });
  });
});
