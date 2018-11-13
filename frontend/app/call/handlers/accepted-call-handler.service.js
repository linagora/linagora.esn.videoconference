(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfAcceptedCallHandler', VideoConfAcceptedCallHandler);

  function VideoConfAcceptedCallHandler(session, VideoConfCallNotification) {
    return {
      onMessage: onMessage
    };

    function onMessage(message) {
      // if the current user is the message.from
      if (message.to === session.user._id) {
        // if the current user is the message.to, dismiss the notification
        VideoConfCallNotification.dismissCallNotification(message);
      }
    }
  }
})(angular);
