(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfCallService', VideoConfCallService);

  function VideoConfCallService(session, VideoConfMessagingService, VIDEOCONFERENCE_EVENTS) {
    return {
      call: call
    };

    function call(to) {
      var from = session.user._id;
      var callId = _generateCallId(from, to);
      var message = {
        from: from,
        to: to,
        type: VIDEOCONFERENCE_EVENTS.INCOMING_CALL,
        id: callId
      };

      return _sendMessage('message', message);
    }

    function _sendMessage(type, message) {
      return VideoConfMessagingService.sendMessage(type, message);
    }

    function _generateCallId(from, to) {
      return [from, to].sort().join('');
    }
  }
})(angular);
