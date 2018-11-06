(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfCallListeners', VideoConfCallListeners);

  function VideoConfCallListeners($log, VideoConfMessagingService, VIDEOCONFERENCE_EVENTS) {
    return {
      init: init
    };

    function init() {
      VideoConfMessagingService.addEventListener(VIDEOCONFERENCE_EVENTS.INCOMING_CALL, onIncomingCall);
    }

    function onIncomingCall(message) {
      $log.debug('Got an incoming call', message);
      // TODO: Show the call widget
      // TODO: Buffer calls from the same caller in a given timewindow, maybe a session id will be useful for this
    }
  }
})(angular);
