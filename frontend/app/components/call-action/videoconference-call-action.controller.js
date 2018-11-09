(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .controller('videoconferenceCallActionController', videoconferenceCallActionController);

  function videoconferenceCallActionController(VideoConfCallService) {
    var self = this;

    self.launch = launch;

    function launch(userId) {
      VideoConfCallService.call(userId);
    }
  }
})(angular);
