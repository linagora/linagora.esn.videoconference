(function(angular) {

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfConfigurationService', VideoConfConfigurationService);

  function VideoConfConfigurationService(esnConfig) {

    return {
      getConferenceUrl: getConferenceUrl,
      getOpenPaasVideoconferenceAppUrl: getOpenPaasVideoconferenceAppUrl,
      getJitsiInstanceUrl: getJitsiInstanceUrl
    };

    function getConferenceUrl(id) {
      return getOpenPaasVideoconferenceAppUrl().then(function(url) {
        // remove trailing '/'
        url = url.replace(/\/+$/i, '');

        return url + '/' + id;
      });
    }

    function getOpenPaasVideoconferenceAppUrl() {
      return esnConfig('linagora.esn.videoconference.openPaasVideoconferenceAppUrl')
        .then(function(openPaasVideoconferenceAppUrl) {
          return openPaasVideoconferenceAppUrl.endsWith('/') ?
                 openPaasVideoconferenceAppUrl :
                 openPaasVideoconferenceAppUrl + '/';
        });
    }

    function getJitsiInstanceUrl() {
      return esnConfig('linagora.esn.videoconference.jitsiInstanceUrl').then(function(jitsiInstanceUrl) {
        return jitsiInstanceUrl.endsWith('/') ? jitsiInstanceUrl : jitsiInstanceUrl + '/';
      });
    }
  }

})(angular);
