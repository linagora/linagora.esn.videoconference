(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .component('videoconferenceNotification', {
      bindings: {
        call: '=',
        onAccept: '&',
        onDeny: '&'
      },
      controllerAs: 'ctrl',
      controller: 'VideoConfNotificationController',
      templateUrl: '/videoconference/app/call/notification/call-notification-content.html'
    });

})(angular);
