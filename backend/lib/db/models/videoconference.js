module.exports = function(dependencies) {
  const mongoose = dependencies('db').mongo.mongoose;
  const Schema = mongoose.Schema;

  const videconferenceSchema = new Schema({
    _id: { type: String, unique: true },
    conferenceName: { type: String },
    domainId: { type: Schema.ObjectId, ref: 'Domain' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamps: {
      start: { type: Date, default: Date.now }
    },
    type: { type: String }
  });

  return mongoose.model('VideoConference', videconferenceSchema);
};
