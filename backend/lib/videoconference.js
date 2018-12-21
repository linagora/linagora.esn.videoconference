module.exports = dependencies => {
  const mongoose = dependencies('db').mongo.mongoose;

  const VideoconferenceModel = mongoose.model('VideoConference');

  const conferenceTypes = Object.freeze({
    PUBLIC: 'public',
    PRIVATE: 'private'
  });

  return {
    conferenceTypes,
    create,
    getByName,
    getByPublicId
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
};
