(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.videoconference';

  angular.module(MODULE_NAME, [
    'esn.core',
    'esn.user',
    'ui.router',
    'op.dynamicDirective',
    'restangular'
  ]);
})(angular);
