module.exports = dependencies => ({
  rights: {
    padmin: 'rw',
    admin: 'rw',
    user: 'r'
  },
  configurations: {
    jitsiConfUrl: require('./jitsiConfUrl')(dependencies),
    baseUrl: require('./baseUrl')(dependencies)
  }
});
