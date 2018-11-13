(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfCallService', VideoConfCallService);

  function VideoConfCallService($log, session, VideoConfLaunchService, VideoConfMessagingService, VIDEOCONFERENCE_EVENTS) {
    return {
      call: call,
      accept: accept,
      deny: deny
    };

    function call(to) {
      var from = session.user._id;
      var callId = _generateCallId(from, to);
      var call = {
        from: from,
        to: to,
        type: VIDEOCONFERENCE_EVENTS.INCOMING_CALL,
        id: callId
      };

      VideoConfLaunchService.openConference(callId);

      return _sendMessage('message', call);
    }

    function accept(call) {
      var ack = {};

      $log.debug('Accepting call', call);
      call && call.id && VideoConfLaunchService.openConference(call.id);
      angular.copy(call, ack);
      ack.type = VIDEOCONFERENCE_EVENTS.ACCEPTED_CALL;

      _sendMessage('message', ack);
    }

    function deny(call) {
      var ack = {};

      $log.debug('Denying call', call);
      angular.copy(call, ack);
      ack.type = VIDEOCONFERENCE_EVENTS.DENIED_CALL;
      _sendMessage('message', ack);
    }

    function _sendMessage(type, message) {
      return VideoConfMessagingService.sendMessage(type, message);
    }

    function _generateCallId(from, to) {
      return [from, to].sort().join('');
    }
  }
})(angular);
