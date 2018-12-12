module.exports = function(dependencies) {
  const mongoose = dependencies('db').mongo.mongoose;
  const Schema = mongoose.Schema;

  const videconferenceSchema = new Schema({
    conferenceName: { type: String, required: true },
    domainId: { type: Schema.Types.ObjectId, ref: 'Domain', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamps: {
      start: { type: Date, default: Date.now, required: true }
    },
    type: { type: String, required: true }
  });

  return mongoose.model('VideoConference', videconferenceSchema);
};
