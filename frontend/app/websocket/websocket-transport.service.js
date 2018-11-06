(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfWebsocketTransportService', VideoConfWebsocketTransportService);

    function VideoConfWebsocketTransportService($log, $q, livenotification, _, VIDEOCONFERENCE_WEBSOCKET) {

      function VideoConfWebsocketTransportService(options) {
        this.options = options;
        this.handlers = {};
      }

      VideoConfWebsocketTransportService.prototype.addEventListener = function(event, handler) {
        if (this.sio) {
          return this.sio.on(event, handler);
        }

        this.handlers[event] = handler;
      };

      VideoConfWebsocketTransportService.prototype.connect = function() {
        if (!this.sio) {
          var self = this;

          self.sio = livenotification(VIDEOCONFERENCE_WEBSOCKET.NAMESPACE, self.options.room);
          _.forEach(self.handlers, function(handler, event) {
            self.sio.on(event, handler);
          });

          self.sio.on('connected', function() {
            $log.info('Connected to videoconference websocket');
          });
        }

        return this;
      };

      VideoConfWebsocketTransportService.prototype.sendMessage = function(type, data) {
        if (!this.sio) {
          return $q.reject(new Error('Not connected to the videoconference websocket'));
        }

        $log.debug('Sending WS message', type, data);
        this.sio.send(type, data);

        return $q.when(data);
      };

      return VideoConfWebsocketTransportService;
    }
})(angular);
