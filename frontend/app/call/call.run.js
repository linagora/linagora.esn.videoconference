(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').run(runBlock);

  function runBlock(session, VideoConfCallListeners, VideoConfMessagingService) {
    session.ready.then(function() {
      VideoConfCallListeners.init();
      VideoConfMessagingService.connect();
    });
  }
})(angular);
