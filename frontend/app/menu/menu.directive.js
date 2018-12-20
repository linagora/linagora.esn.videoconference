(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
         .directive('videoconferenceApplicationMenu', videoconferenceApplicationMenu);

  function videoconferenceApplicationMenu(applicationMenuTemplateBuilder) {
    var directive = {
      retrict: 'E',
      replace: true,
      controller: 'videoconferenceApplicationMenuController',
      controllerAs: '$ctrl',
      scope: true,
      template: applicationMenuTemplateBuilder({ url: '{{$ctrl.url}}', target: '_blank', rel: 'noopener noreferrer' }, { url: '/videoconference/images/videoconference.svg' }, 'Video Conference')
    };

    return directive;
  }
})(angular);
