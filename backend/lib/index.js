module.exports = function(dependencies) {
  const videoconference = require('./videoconference')(dependencies);

  return {
    videoconference
  };
};
