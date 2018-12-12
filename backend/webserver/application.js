'use strict';

const express = require('express');

// This is you own express application
module.exports = function(dependencies) {
  const application = express();

  // Every express new configuration are appended here.
  // This needs to be initialized before the body parser
  require('./config/i18n')(dependencies, application);
  require('./config/views')(dependencies, application);

  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV === 'dev') {
    application.use(require('cors')());
  }

  application.use('/api', require('./api')(dependencies));

  return application;
};
