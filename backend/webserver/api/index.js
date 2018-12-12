const express = require('express');

module.exports = dependencies => {

  const router = express.Router();

  router.use('/conference', require('./videoconference')(dependencies));

  return router;
};
