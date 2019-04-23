const express = require('express');

module.exports = dependencies => {

  const router = express.Router();
  const moduleName = 'linagora.esn.videoconference';

  router.use('/conference', require('./videoconference')(dependencies, moduleName));

  return router;
};
