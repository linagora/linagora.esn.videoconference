module.exports = function(dependencies) {
  require('./db')(dependencies);
  const videoconference = require('./videoconference')(dependencies);

  return {
    videoconference
  };
};
