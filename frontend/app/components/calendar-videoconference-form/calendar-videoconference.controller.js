(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .controller('calendarVideoconferenceFormController', calendarVideoconferenceFormController);

  function calendarVideoconferenceFormController(uuid4, VideoConfConfigurationService, EVENT_VIDEOCONFERENCE_OPTIONS) {
    var self = this;

    self.videoconferenceOptions = EVENT_VIDEOCONFERENCE_OPTIONS;
    self.videoConfBaseUrl = '';
    self._videoconference = EVENT_VIDEOCONFERENCE_OPTIONS.NO_VIDEOCONFERENCE;
    self._roomName = uuid4.generate();

    self.$onInit = $onInit;
    self.isVideoConfBaseUrlValid = isVideoConfBaseUrlValid;
    self.roomName = roomName;
    self.videoconference = videoconference;

    function $onInit() {
      VideoConfConfigurationService.getjitsiInstanceUrl().then(function(jitsiInstanceUrl) {
        self.videoConfBaseUrl = jitsiInstanceUrl;
      });

      if (self.event.xOpenpaasVideoconference && self.event.xOpenpaasVideoconference.trim().length > 0) {
        self._videoconference = EVENT_VIDEOCONFERENCE_OPTIONS.OPENPAAS_VIDEOCONFERENCE;
        self._roomName = new URL(self.event.xOpenpaasVideoconference).pathname.slice(1);
      }
    }

    function isVideoConfBaseUrlValid() {
      return self.videoConfBaseUrl && self.videoConfBaseUrl.trim().length > 0;
    }

    function roomName(value) {
      if (!arguments.length) {
        return self._roomName;
      }

      self._roomName = value;
      self.event.xOpenpaasVideoconference = _fullPath();
    }

    function videoconference(value) {
      if (!arguments.length) {
        return self._videoconference;
      }

      self._videoconference = value;
      self.event.xOpenpaasVideoconference = _fullPath();
    }

    function _fullPath() {
      return (self.isVideoConfBaseUrlValid() &&
        self._videoconference !== EVENT_VIDEOCONFERENCE_OPTIONS.NO_VIDEOCONFERENCE) ?
        self.videoConfBaseUrl + self._roomName : undefined;
    }
  }
})(angular);
