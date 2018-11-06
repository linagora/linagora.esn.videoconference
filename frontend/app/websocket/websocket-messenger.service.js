(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfWebsocketMessengerService', VideoConfWebsocketMessengerService);

  function VideoConfWebsocketMessengerService(VideoConfWebsocketTransportService, session) {
    var transport;

    return {
      get: get
    };

    function get() {
      if (transport) {
        return transport;
      }

      transport = new VideoConfWebsocketTransportService({
        room: session.user._id
      });

      return transport;
    }
  }
})(angular);
