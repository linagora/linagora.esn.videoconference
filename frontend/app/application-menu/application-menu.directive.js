(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
         .directive('videoconferenceApplicationMenu', videoconferenceApplicationMenu);

  function videoconferenceApplicationMenu(applicationMenuTemplateBuilder, VIDEOCONFERENCE_MODULE_METADATA) {
    var directive = {
      retrict: 'E',
      replace: true,
      controller: 'videoconferenceApplicationMenuController',
      controllerAs: '$ctrl',
      scope: true,
      template: applicationMenuTemplateBuilder(
        {url: '{{ $ctrl.url }}', target: '_blank', rel: 'noopener noreferrer'},
        { url: VIDEOCONFERENCE_MODULE_METADATA.icon },
        VIDEOCONFERENCE_MODULE_METADATA.title,
        'core.modules.linagora.esn.videoconference.enabled',
        VIDEOCONFERENCE_MODULE_METADATA.isDisplayedByDefault
      )
    };

    return directive;
  }
})(angular);
