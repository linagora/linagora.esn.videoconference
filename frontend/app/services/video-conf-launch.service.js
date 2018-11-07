(function(angular) {

  angular.module('linagora.esn.videoconference')
    .factory('VideoConfLaunchService', VideoConfLaunchService);

  function VideoConfLaunchService($window, VideoConfConfigurationService) {

    return {
      openConference: openConference
    };

    function openConference(id) {
      VideoConfConfigurationService.getConferenceUrl(id).then(function(url) {
        return $window.open(url);
      });
    }
  }

})(angular);
