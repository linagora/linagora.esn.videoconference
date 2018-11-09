module.exports = dependencies => ({
  rights: {
    padmin: 'rw',
    admin: 'rw',
    user: 'r'
  },
  configurations: {
    jitsiInstanceUrl: require('./jitsiInstanceUrl')(dependencies),
    openPaasVideoconferenceAppUrl: require('./openPaasVideoconferenceAppUrl')(dependencies)
  }
});
