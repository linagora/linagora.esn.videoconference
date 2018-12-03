module.exports = dependencies => {
  const mongoose = dependencies('db').mongo.mongoose;

  const VideoconferenceModel = mongoose.model('VideoConference');

  return {
    create,
    get
  };

  function create(conference) {
    return VideoconferenceModel.findOneAndUpdate(
      {conferenceName: conference.conferenceName, domainId: conference.domainId, creatorId: conference.creatorId},
      conference, {upsert: true, new: true, setDefaultsOnInsert: true}
    );
  }

  function get(conferenceId) {
    return VideoconferenceModel.findById(conferenceId);
  }
};
