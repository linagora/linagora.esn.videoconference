(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfIncomingCallHandler', VideoConfIncomingCallHandler);

  function VideoConfIncomingCallHandler(VideoConfCallNotification, VideoConfCallService) {
    return {
      onCall: onCall
    };

    function onCall(call) {
      VideoConfCallNotification.displayCallNotification(call, VideoConfCallService.accept, VideoConfCallService.deny);
    }
  }
})(angular);
