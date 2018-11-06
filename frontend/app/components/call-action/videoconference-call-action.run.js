(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .run(runBlock);

  function runBlock(dynamicDirectiveService, DynamicDirective) {
    var videoconferenceCallDynamicDirective = new DynamicDirective(true, 'videoconference-call-action', {
      attributes: [{ name: 'user-id', value: '{{$ctrl.user._id}}' }]
    });

    dynamicDirectiveService.addInjection('contact-list-menu-items', videoconferenceCallDynamicDirective);
  }
})(angular);
