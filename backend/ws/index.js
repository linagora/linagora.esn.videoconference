const { NAMESPACE } = require('./constants');
const handler = require('./handler');

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

    handler(dependencies).init(io.of(NAMESPACE));
    initialized = true;
  }
};
