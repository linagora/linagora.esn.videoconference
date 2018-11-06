(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfCallService', VideoConfCallService);

  function VideoConfCallService(session, VideoConfMessagingService, VIDEOCONFERENCE_EVENTS) {
    return {
      call: call
    };

    function call(to) {
      var message = {
        from: session.user._id,
        to: to,
        type: VIDEOCONFERENCE_EVENTS.INCOMING_CALL
      };

      return _sendMessage('message', message);
    }

    function _sendMessage(type, message) {
      return VideoConfMessagingService.sendMessage(type, message);
    }
  }
})(angular);
