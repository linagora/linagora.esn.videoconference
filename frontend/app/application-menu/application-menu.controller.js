(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').controller('videoconferenceApplicationMenuController', videoconferenceApplicationMenuController);

  function videoconferenceApplicationMenuController(VideoConfConfigurationService) {
    var self = this;

    VideoConfConfigurationService.getOpenPaasVideoconferenceAppUrl().then(function(url) {
      self.url = url;
    });
  }
})(angular);
