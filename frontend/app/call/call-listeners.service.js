(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfCallListeners', VideoConfCallListeners);

  function VideoConfCallListeners(
    $log,
    VideoConfMessagingService,
    VideoConfIncomingCallHandler,
    VideoConfAcceptedCallHandler,
    VIDEOCONFERENCE_EVENTS
  ) {
    return {
      init: init
    };

    function init() {
      VideoConfMessagingService.addEventListener(VIDEOCONFERENCE_EVENTS.INCOMING_CALL, onIncomingCall);
      VideoConfMessagingService.addEventListener(VIDEOCONFERENCE_EVENTS.ACCEPTED_CALL, onAcceptedCall);
    }

    function onIncomingCall(message) {
      $log.debug('Got an incoming call', message);
      VideoConfIncomingCallHandler.onCall(message);
    }

    function onAcceptedCall(message) {
      $log.debug('Got an accepted call', message);
      VideoConfAcceptedCallHandler.onMessage(message);
    }
  }
})(angular);
