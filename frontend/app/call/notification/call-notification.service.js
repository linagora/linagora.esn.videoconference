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
      var template = '<div data-notify="container" class="videoconference-notification-container call-' + call.id + ' alert alert-{0}" role="alert"></div>';
      var component = '<videoconference-notification call="call" on-accept="onAccept()" on-deny="onDeny()"/>';
      var scope = $rootScope.$new();

      scope.call = call;

      var element = $compile(component)(scope);
      var notification = $window.$.notify({}, {
        type: 'minimalist',
        delay: VIDEOCONFERENCE_TIMEOUT,
        icon_type: 'image',
        mouse_over: 'pause',
        template: template,
        onClose: function() {
          if (!notification.closedByUser) {
            // TODO: If notification is closed by delay timeout, do something
            $log.debug('Notification timeout, user missed the call');
          }
        },
        onShow: function() {
          scope.onAccept = function() {
            closeNotification(call);
            onAccept && onAccept(call);
          };

          scope.onDeny = function() {
            closeNotification(call);
            onDeny && onDeny(call);
          };

          notifications[call.id] && closeNotification(call);
          angular.element('.videoconference-notification-container.call-' + call.id).append(element);
        }
      });

      notifications[call.id] = notification;
    }

    function dismissCallNotification(call) {
      $log.debug('Dismissing call notification');
      closeNotification(call);
    }

    function closeNotification(call) {
      var notification = call && call.id && notifications[call.id];

      if (!notification) {
        return;
      }

      notification.closedByUser = true;
      notification.close();
    }
  }
})(angular);
