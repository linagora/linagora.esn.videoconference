(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .constant('VIDEOCONFERENCE_EVENTS', {
      INCOMING_CALL: 'call:incoming'
    })
    .constant('VIDEOCONFERENCE_WEBSOCKET', {
      NAMESPACE: '/videoconference'
    });
})(angular);
