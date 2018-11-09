(function(angular) {

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfConfigurationService', VideoConfConfigurationService);

  function VideoConfConfigurationService(esnConfig) {

    return {
      getConferenceUrl: getConferenceUrl,
      getConferenceAppUrl: getConferenceAppUrl,
      getJitsiAppUrl: getJitsiAppUrl
    };

    function getConferenceUrl(id) {
      return getConferenceAppUrl().then(function(url) {
        return url + '/' + id;
      });
    }

    function getConferenceAppUrl() {
      return esnConfig('linagora.esn.videoconference.baseUrl').then(function(baseUrl) {
        return baseUrl;
      });
    }

    function getJitsiAppUrl() {
      return esnConfig('linagora.esn.videoconference.jitsiConfUrl').then(function(jitsiConfUrl) {
        return jitsiConfUrl;
      });
    }
  }

})(angular);
