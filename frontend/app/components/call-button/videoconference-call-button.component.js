(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .component('videoconferenceCallButton', {
      templateUrl: '/videoconference/app/components/call-button/videoconference-call-button.html',
      controller: 'videoconferenceCallButtonController',
      bindings: {
        userId: '@',
        objectType: '@',
        isCurrentUser: '<'
      }
    });
})(angular);
