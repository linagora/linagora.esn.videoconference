(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .component('videoconferenceCallAction', {
      templateUrl: '/videoconference/app/components/call-action/videoconference-call-action.html',
      bindings: {
        userId: '@'
      },
      controllerAs: 'ctrl'
    });

})(angular);
