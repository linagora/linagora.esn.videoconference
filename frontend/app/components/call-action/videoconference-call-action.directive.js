(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .directive('videoconferenceCallAction', videoconferenceCallAction);

    function videoconferenceCallAction() {
      return {
        replace: true,
        restrict: 'E',
        templateUrl: '/videoconference/app/components/call-action/videoconference-call-action.html',
        controller: 'videoconferenceCallActionController',
        controllerAs: '$ctrl'
      };
    }
})(angular);
