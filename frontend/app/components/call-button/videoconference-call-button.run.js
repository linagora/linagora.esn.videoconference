(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .run(runBlock);

  function runBlock(dynamicDirectiveService, DynamicDirective) {
    var videoconferenceCallDynamicDirective = new DynamicDirective(true, 'videoconference-call-button', {
      attributes: [{ name: 'user-id', value: '{{$ctrl.user._id}}' }]
    });

    dynamicDirectiveService.addInjection('profile-user-actions', videoconferenceCallDynamicDirective);
  }
})(angular);
