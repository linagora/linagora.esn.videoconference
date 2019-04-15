(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .controller('videoconferenceCallButtonController', videoconferenceCallButtonController);

  function videoconferenceCallButtonController(VideoConfCallService, session) {
    var self = this;

    self.launch = launch;
    self.isCurrentUser = self.userId === session.user._id;

    function launch(userId) {
      if (self.isCurrentUser) return;
      VideoConfCallService.call(userId);
    }
  }
})(angular);
