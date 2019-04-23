'use strict';

/* global _: false */

angular.module('esn.form.helper', []);
angular.module('esn.user', []);
angular.module('esn.core', [])
  .constant('_', _);
angular.module('esn.module-registry', [])
  .factory('esnModuleRegistry', function() {
    return {};
  });
angular.module('pascalprecht.translate', [])
  .provider('$translate', function() {
    return {
      useSanitizeValueStrategy: angular.noop,
      preferredLanguage: angular.noop,
      useStaticFilesLoader: angular.noop,
      $get: angular.noop
    };
  });
