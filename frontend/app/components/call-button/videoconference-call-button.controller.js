(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .controller('videoconferenceCallButtonController', videoconferenceCallButtonController);

  function videoconferenceCallButtonController(VideoConfCallService) {
    var self = this;

    self.launch = launch;

    function launch(userId) {
      VideoConfCallService.call(userId);
    }
  }
})(angular);
