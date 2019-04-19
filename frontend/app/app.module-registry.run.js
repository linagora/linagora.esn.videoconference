(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .run(registerModuleConfiguration);

  function registerModuleConfiguration(esnModuleRegistry, VIDEOCONFERENCE_MODULE_METADATA) {
    esnModuleRegistry.add(VIDEOCONFERENCE_MODULE_METADATA);
  }

})(angular);
