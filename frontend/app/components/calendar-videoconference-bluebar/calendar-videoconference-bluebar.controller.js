(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
         .controller('calendarVideoconferenceBluebarController', calendarVideoconferenceBluebarController);

  function calendarVideoconferenceBluebarController(uuid4, VideoConfConfigurationService) {
    var self = this;

    self.$onInit = $onInit;
    self.videoconference = videoconference;

    function $onInit() {
      return VideoConfConfigurationService.getJitsiInstanceUrl().then(function(jitsiInstanceUrl) {
        self.videoConfHostname = jitsiInstanceUrl;
      });
    }

    function videoconference() {
      if (self.videoConfHostname && self.videoconferenceLink && self.videoconferenceLink.length) {
        return self.videoConfHostname + new URL(self.videoconferenceLink).pathname.slice(1);
      }

      return '';
    }
  }
})(angular);
