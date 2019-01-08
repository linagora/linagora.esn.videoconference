const { DEFAULT_APP_URL } = require('./constants');
const conferenceTypes = Object.freeze({
  PUBLIC: 'public',
  PRIVATE: 'private'
});

module.exports = dependencies => {
  const logger = dependencies('logger');
  const mongoose = dependencies('db').mongo.mongoose;
  const esnConfig = dependencies('esn-config');

  const VideoconferenceModel = mongoose.model('VideoConference');

  return {
    conferenceTypes,
    create,
    getByName,
    getByPublicId,
    getAppUrl,
    getConfigurationUrl,
    getUrls
  };

  function create(conference) {
    return VideoconferenceModel.findOneAndUpdate(
      {conferenceName: conference.conferenceName, domainId: conference.domainId},
      conference, {upsert: true, new: true, setDefaultsOnInsert: true}
    );
  }

  function getByName(conferenceName) {
    return VideoconferenceModel.findOne({ conferenceName });
  }

  function getByPublicId(publicId) {
    return VideoconferenceModel.findOne({publicId: publicId, type: conferenceTypes.PUBLIC});
  }

  function getUrls(conference) {
    return getAppUrl(conference.domainId).then(url => ({
      public: `${url}/o/${conference.publicId}`,
      private: `${url}/${conference.conferenceName}`
    }));
  }

  function getAppUrl(domainId) {
    return getConfigurationUrl('openPaasVideoconferenceAppUrl', domainId, DEFAULT_APP_URL);
  }

  function getConfigurationUrl(name, domainId, defaultValue) {
    return esnConfig(name).inModule('linagora.esn.videoconference')
      .getFromAllDomains()
      .then(configs => ((configs || []).find(config => config.domainId.toString() === domainId.toString())))
      .then(config => (config ? config.config || defaultValue : defaultValue))
      .catch(err => {
        logger.error(`Can not get ${name} URL, defaulting to ${defaultValue}`, err);

        return DEFAULT_APP_URL;
      });
  }
};
