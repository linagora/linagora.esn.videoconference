(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .component('calendarVideoconferenceForm', {
      templateUrl: '/videoconference/app/components/calendar-videoconference-form/calendar-videoconference.html',
      controller: 'calendarVideoconferenceFormController',
      bindings: {
        event: '=',
        canModifyEvent: '='
      }
    });

})(angular);
