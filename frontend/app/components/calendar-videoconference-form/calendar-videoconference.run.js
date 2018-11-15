(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').run(runBlock);

  function runBlock(dynamicDirectiveService, DynamicDirective) {
    var attributes = [{name: 'event', value: 'editedEvent'}];
    var directive = new DynamicDirective(true, 'calendar-videoconference-form', {attributes: attributes});

    dynamicDirectiveService.addInjection('calendar-videoconference', directive);
  }
})(angular);
