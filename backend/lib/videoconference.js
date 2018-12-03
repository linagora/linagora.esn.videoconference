module.exports = dependencies => {
  const mongoose = dependencies('db').mongo.mongoose;

  require('./db');
  const VideoconferenceModel = mongoose.model('VideoConference');

  return {
    create,
    get
  };

  function create(conference) {
    const videoconference = new VideoconferenceModel(conference);

    return videoconference.save();
  }

  function get(conferenceId) {
    return VideoconferenceModel.findOne({_id: conferenceId});
  }
};
