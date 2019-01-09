const { DEFAULT_JITSI_URL } = require('../../../lib/constants');

module.exports = dependencies => {
  const logger = dependencies('logger');
  const { videoconference } = require('../../../lib')(dependencies);

  return {
    createConference,
    getConferenceByPublicId
  };

  function createConference(req, res) {
    const domainId = req.domain ? req.domain._id || null : null;
    let conferenceBody;

    try {
      conferenceBody = _validateConferenceObject(req.body);
    } catch (err) {
      logger.error(`Bad conference input ${req.body}`, err);

      return res.status(400).json({
        error: {
          status: 400,
          message: 'Bad request',
          details: err.message
        }
      });
    }

    conferenceBody.domainId = domainId;
    conferenceBody.creatorId = req.user._id;

    _getJitsiInstanceUrl(domainId)
      .then(url => _createConference(url, conferenceBody))
      .then(response => res.status(200).json(response))
      .catch(err => {
        const msg = 'Error while creating conference';

        logger.error(msg, err);
        res.status(500).json({
          error: {
            status: 500,
            message: 'Server error',
            details: msg
          }
        });
      });

      function _createConference(jitsiInstanceUrl, conference) {
        return videoconference.create(conference).then(result => ({
          publicId: result.publicId,
          conferenceName: result.conferenceName,
          type: result.type,
          jitsiInstanceUrl
        }));
      }
  }

  function getConferenceByPublicId(req, res) {
    return _getConferenceBy(req, res, 'publicId');
  }

  function _getConferenceBy(req, res, modelField) {
    const domainId = req.domain ? req.domain._id || null : null;
    const query = req.params[modelField];

    _getJitsiInstanceUrl(domainId)
      .then(jitsiInstanceUrl => getConference(jitsiInstanceUrl, query, modelField))
      .then(conference => (conference ? res.status(200).json(conference) : res.status(404).json({
        error: {
          status: 404,
          message: 'Not found',
          details: `Can not find conference ${modelField} of ${query}`
        }
      })))
      .catch(err => {
        const msg = `Error while gettting conference with ${modelField} of ${query}`;

        logger.error(msg, err);
        res.status(500).json({
          error: {
            status: 500,
            message: 'Server error',
            details: msg
          }
        });
      });

    function getConference(jitsiInstanceUrl, query, modelField) {
      const get = {
        conferenceName: videoconference.getByName,
        publicId: videoconference.getByPublicId
      }[modelField];

      return get(query).then(conference => {
        if (!conference) {
          return;
        }

        return {
          publicId: conference.publicId,
          conferenceName: conference.conferenceName,
          type: conference.type,
          jitsiInstanceUrl
        };
      });
    }
  }

  function _getJitsiInstanceUrl(domainId) {
    return videoconference.getConfigurationUrl('jitsiInstanceUrl', domainId, DEFAULT_JITSI_URL);
  }

  function _validateConferenceObject(body) {
    const allowedTypes = Object.values(videoconference.conferenceTypes);
    const conferenceName = body.conferenceName ? body.conferenceName.toString() : undefined;
    const type = body.type ? body.type.toString() : undefined;

    if (!conferenceName) {
      throw new Error('`conferenceName` parameter is mandatory');
    }

    if (!type) {
      throw new Error('`type` parameter is mandatory');
    }

    if (!allowedTypes.find(it => it === type)) {
      throw new Error(`\`type\` must be one of ${allowedTypes}`);
    }

    return { conferenceName, type };
  }
};
