(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfCallNotification', VideoConfCallNotification);

  function VideoConfCallNotification($log, $window, $compile, $rootScope, VIDEOCONFERENCE_TIMEOUT) {
    var notifications = {};

    return {
      displayCallNotification: displayCallNotification,
      dismissCallNotification: dismissCallNotification
    };

    function displayCallNotification(call, onAccept, onDeny) {
      var template = '<div data-notify="container" class="videoconference-notification-container alert alert-{0}" role="alert"></div>';
      var component = '<videoconference-notification call="call" on-accept="onAccept()" on-deny="onDeny()"/>';
      var scope = $rootScope.$new();

      scope.call = call;

      var element = $compile(component)(scope);

      notifications[call.id] = $window.$.notify({}, {
        type: 'minimalist',
        delay: VIDEOCONFERENCE_TIMEOUT,
        icon_type: 'image',
        template: template,
        onShow: function() {
          scope.onAccept = function() {
            closeNotification(call);
            onAccept && onAccept(call);
          };

          scope.onDeny = function() {
            closeNotification(call);
            onDeny && onDeny(call);
          };

          angular.element('.videoconference-notification-container').append(element);
        }
      });
    }

    function dismissCallNotification(call) {
      $log.debug('Dismissing call notification');
      closeNotification(call);
    }

    function closeNotification(call) {
      call && call.id && notifications[call.id] && notifications[call.id].close();
    }
  }
})(angular);
