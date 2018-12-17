module.exports = dependencies => {
  const {videoconference} = require('../../../lib')(dependencies);

  const esnConfig = dependencies('esn-config');

  return {
    createConference,
    getConferenceByPublicId
  };

  function createConference(req, res) {
    const domainId = req.domain ? req.domain._id || null : null;
    let conferenceBody;

    try {
      conferenceBody = _validateConferenceObject(req.body);
    } catch (e) {
      return res.status(400).json({
        error: {
          status: 400,
          message: 'Server Error',
          details: e.message
        }
      });
    }

    _getJitsiInstanceUrl(domainId)
      .then(jitsiInstanceUrl => {
        conferenceBody.domainId = domainId;
        conferenceBody.creatorId = req.user._id;

        return videoconference.create(conferenceBody)
          .then(result => res.status(200).json({
            publicId: result.publicId,
            conferenceName: result.conferenceName,
            type: result.type,
            jitsiInstanceUrl
          }));
      });
  }

  function getConferenceByPublicId(req, res) {
    return _getConferenceBy(req, res, 'publicId');
  }

  function _getConferenceBy(req, res, modelField) {
    const domainId = req.domain ? req.domain._id || null : null;
    const query = req.params[modelField];
    const fn = {
      conferenceName: videoconference.getByName,
      publicId: videoconference.getByPublicId
    }[modelField];

    return _getJitsiInstanceUrl(domainId)
      .then(
        jitsiInstanceUrl =>
          fn(query)
            .then(result => res.status(200).json({
              publicId: result.publicId,
              conferenceName: result.conferenceName,
              type: result.type,
              jitsiInstanceUrl
            }))
            .catch(() => res.status(404).json({
              error: {
                status: 404,
                message: 'Conference not found',
                details: `Unable to retreive conference with ${modelField} of ${query}`
              }
            }))
      );
  }

  function _getJitsiInstanceUrl(domainId, res) {
    return esnConfig('jitsiInstanceUrl').inModule('linagora.esn.videoconference')
      .getFromAllDomains()
      .then(configs => {
        const config = configs.find(item => item.domainId.toString() === domainId.toString());

        return config.config;
      })
      .catch(() => res.status(500).json({
        error: {
          status: 500,
          message: 'Server Error',
          details: `Unknown OpenPaaS domain (given: ${domainId})`
        }
      }));
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

    return {conferenceName, type};
  }
};
