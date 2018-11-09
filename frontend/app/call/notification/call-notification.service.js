(function(angular) {
  'use strict';

  angular.module('linagora.esn.videoconference').factory('VideoConfCallNotification', VideoConfCallNotification);

  function VideoConfCallNotification($window, $compile, $rootScope) {
    return {
      displayCallNotification: displayCallNotification
    };

    function displayCallNotification(call, onAccept, onDeny) {
      var template = '<div data-notify="container" class="videoconference-notification-container alert alert-{0}" role="alert"></div>';
      var component = '<videoconference-notification call="call" on-accept="onAccept()" on-deny="onDeny()"/>';
      var scope = $rootScope.$new();

      scope.call = call;

      var element = $compile(component)(scope);
      var notification = $window.$.notify({}, {
        type: 'minimalist',
        delay: 0,
        icon_type: 'image',
        template: template,
        onShow: function() {
          scope.onAccept = function() {
            notification.close();
            onAccept && onAccept(call);
          };

          scope.onDeny = function() {
            notification.close();
            onDeny && onDeny(call);
          };

          angular.element('.videoconference-notification-container').append(element);
        }
      });
    }
  }
})(angular);
