(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .controller('videoconferenceCallButtonController', videoconferenceCallButtonController);

  function videoconferenceCallButtonController(VideoConfCallService, session) {
    var self = this;

    self.launch = launch;
    self.isNotUser = isNotUser;

    if (!self.isCurrentUser) {
      self.isCurrentUser = self.userId === session.user._id;
    }

    function isNotUser() {
      return (self.isCurrentUser || self.objectType !== 'user');
    }

    function launch(userId) {
      if (self.isCurrentUser) return;
      VideoConfCallService.call(userId);
    }
  }
})(angular);
