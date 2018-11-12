(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .controller('VideoConfNotificationController', VideoConfNotificationController);

    function VideoConfNotificationController(usernameService) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {
        usernameService.getFromId(self.call.from).then(function(username) {
          self.callerName = username;
        });
      }
    }

})(angular);
