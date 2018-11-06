(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')

  .component('videoconferenceConfigForm', {
    templateUrl: '/videoconference/app/components/config/videoconference-config-form.html',
    bindings: {
      configurations: '='
    }
  });

})(angular);
