(function() {
  'use strict';

  angular.module('linagora.esn.videoconference')
    .config(injectApplicationMenu);

    function injectApplicationMenu(dynamicDirectiveServiceProvider) {
      var appMenu = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'videoconference-application-menu', { priority: 30 });

      dynamicDirectiveServiceProvider.addInjection('esn-application-menu', appMenu);
    }
})();
