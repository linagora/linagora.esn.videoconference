(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .run(runBlock);

  function runBlock(dynamicDirectiveService, DynamicDirective) {
    var videoconferenceCallDynamicDirective = new DynamicDirective(true, 'videoconference-call-button', {
      attributes: [{ name: 'user-id', value: '{{$ctrl.user._id}}' }, { name: 'is-current-user', value: '{{$ctrl.isCurrentUser}}'}, { name: 'object-type', value: '{{$ctrl.objectType}}'}]
    });

    dynamicDirectiveService.addInjection('profile-user-actions', videoconferenceCallDynamicDirective);
  }
})(angular);
