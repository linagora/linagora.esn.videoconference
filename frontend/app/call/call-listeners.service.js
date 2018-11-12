(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfCallListeners', VideoConfCallListeners);

  function VideoConfCallListeners($log, VideoConfMessagingService, VideoConfIncomingCallHandler, VIDEOCONFERENCE_EVENTS) {
    return {
      init: init
    };

    function init() {
      VideoConfMessagingService.addEventListener(VIDEOCONFERENCE_EVENTS.INCOMING_CALL, onIncomingCall);
    }

    function onIncomingCall(message) {
      $log.debug('Got an incoming call', message);
      VideoConfIncomingCallHandler.onCall(message);
    }
  }
})(angular);
