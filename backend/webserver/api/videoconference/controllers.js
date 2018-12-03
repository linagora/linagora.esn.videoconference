module.exports = dependencies => {
  const {videoconference} = require('../../../lib')(dependencies);

  const esnConfig = dependencies('esn-config');

  return {
    createConference,
    getConferenceById
  };

  function createConference(req, res) {
    const domainId = req.domain ? req.domain._id || null : null;
    const conferenceBody = _validateConferenceObject(req.body);

    if (typeof conferenceBody !== 'object') {
      return res.status(400).json({
        error: {
          status: 400,
          message: 'Server Error',
          details: conferenceBody
        }
      });
    }

    _getJitsiInstanceUrl(domainId)
      .then(jitsiInstanceUrl => {
        conferenceBody.domainId = domainId;
        conferenceBody.creatorId = req.user._id;

        return videoconference.create(conferenceBody)
          .then(result => res.status(200).json({
            _id: result._id,
            conferenceName: result.conferenceName,
            type: result.type,
            jitsiInstanceUrl
          }));
      })
      .catch(() => res.status(500).json({
        error: {
          status: 500,
          message: 'Server Error',
          details: `Unable to create conference ${JSON.stringify(req.body)}`
        }
      }));
  }

  function getConferenceById(req, res) {
    const domainId = req.domain ? req.domain._id || null : null;

    _getJitsiInstanceUrl(domainId)
      .then(
        jitsiInstanceUrl =>
          videoconference.get(req.params.conferenceId)
            .then(result => res.status(200).json({
              _id: result._id,
              conferenceName: result.conferenceName,
              type: result.type,
              jitsiInstanceUrl
            }))
            .catch(() => res.status(404).json({
              error: {
                status: 404,
                message: 'Conference not found',
                details: `Unable to retreive conference with id ${req.params.conferenceId}`
              }
            }))
      )
      .catch(() => res.status(500).json({
        error: {
          status: 500,
          message: 'Server Error',
          details: `Unable to retreive conference ${JSON.stringify(req.body)}`
        }
      }));
  }

  function _getJitsiInstanceUrl(domainId) {
    return esnConfig('jitsiInstanceUrl').inModule('linagora.esn.videoconference')
      .getFromAllDomains()
      .then(configs => {
        const config = configs.find(item => item.domainId.toString() === domainId.toString());

        return config.config;
      });
  }

  function _validateConferenceObject(body) {
    const allowedTypes = ['public', 'private'];
    const conferenceName = body.conferenceName ? body.conferenceName.toString() : undefined;
    const type = body.type ? body.type.toString() : undefined;

    if (!conferenceName) {
      return '`conferenceName` parameter is mandatory';
    }

    if (!type) {
      return '`type` parameter is mandatory';
    }

    if (!allowedTypes.find(it => it === type)) {
      return `\`type\` must be one of ${allowedTypes}`;
    }

    return {conferenceName, type};
  }
};
