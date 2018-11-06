const { NAMESPACE } = require('./constants');

module.exports = dependencies => {
  const logger = dependencies('logger');
  const io = dependencies('wsserver').io;

  let initialized = false;

  return {
    init
  };

  function init() {
    if (initialized) {
      logger.warn('The videoconference notification service is already initialized');

      return;
    }

    const callHandler = require('./handler')(dependencies);
    const conferenceNamespace = io.of(NAMESPACE);

    callHandler.init(conferenceNamespace);
    initialized = true;
  }
};
