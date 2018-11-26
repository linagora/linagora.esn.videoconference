(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .component('calendarVideoconferenceBluebar', {
      templateUrl: '/videoconference/app/components/calendar-videoconference-bluebar/calendar-videoconference-bluebar.html',
      controller: 'calendarVideoconferenceBluebarController',
      bindings: {
        videoconferenceLink: '='
      }
    });

})(angular);
