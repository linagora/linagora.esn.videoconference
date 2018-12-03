const express = require('express');

module.exports = dependencies => {
  const router = express.Router();
  const controllers = require('./controllers')(dependencies);
  const {requiresAPILogin} = dependencies('authorizationMW');
  const { loadDomainByHostname } = dependencies('domainMW');

  /**
   * @swagger
   * /api/conference:
   *     put:
   *       tags:
   *         - VideoConference
   *       description: Creates a new video conference
   *       parameters:
   *         - name: conference
   *           in: body
   *           description: The conference to create
   *           schema:
   *             type: object
   *             properties:
   *               conferenceName:
   *                 type: string
   *               type:
   *                 type: string
   *                 enum:
   *                   - private
   *                   - public
   *       responses:
   *         201:
   *           description: OK. With created conference
   *           examples:
   *             {
   *                12,
   *                "OpenPaaS",
   *                "public",
   *                "http://janus.hubl.in"
   *             }
   *         401:
   *           $ref: "#/responses/cm_401"
   *         403:
   *           $ref: "#/responses/cm_403"
   */
  router.put('/', loadDomainByHostname, requiresAPILogin, controllers.createConference);

  /**
   * @swagger
   *   /api/conference/{conferenceId}:
   *     get:
   *       tags:
   *         - VideoConference
   *       description: Retreives a conference by its ID
   *       parameters:
   *         - name: conferenceId
   *           in: path
   *           required: true
   *           description: conference ID
   *           type: string
   *       responses:
   *         201:
   *           description: OK. With queried conference
   *           examples:
   *             {
   *                12,
   *                "OpenPaaS",
   *                "public",
   *                "http://janus.hubl.in"
   *             }
   *         401:
   *           $ref: "#/responses/cm_401"
   *         403:
   *           $ref: "#/responses/cm_403"
   */
  router.get('/:conferenceId', loadDomainByHostname, controllers.getConferenceById);

  return router;
};
