(function(angular) {

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfConfigurationService', VideoConfConfigurationService);

  function VideoConfConfigurationService(esnConfig) {

    return {
      getConferenceUrl: getConferenceUrl,
      getOpenPaasVideoconferenceAppUrl: getOpenPaasVideoconferenceAppUrl,
      getjitsiInstanceUrl: getjitsiInstanceUrl
    };

    function getConferenceUrl(id) {
      return getOpenPaasVideoconferenceAppUrl().then(function(url) {
        // remove trailing '/'
        url = url.replace(/\/+$/i, '');

        return url + '/' + id;
      });
    }

    function getOpenPaasVideoconferenceAppUrl() {
      return esnConfig('linagora.esn.videoconference.openPaasVideoconferenceAppUrl').then(function(openPaasVideoconferenceAppUrl) {
        return openPaasVideoconferenceAppUrl;
      });
    }

    function getjitsiInstanceUrl() {
      return esnConfig('linagora.esn.videoconference.jitsiInstanceUrl').then(function(jitsiInstanceUrl) {
        return jitsiInstanceUrl;
      });
    }
  }

})(angular);
