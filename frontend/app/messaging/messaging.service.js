(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfMessagingService', VideoConfMessagingService);

  function VideoConfMessagingService(VideoConfWebsocketMessengerService) {
    return VideoConfWebsocketMessengerService.get();
  }
})(angular);
