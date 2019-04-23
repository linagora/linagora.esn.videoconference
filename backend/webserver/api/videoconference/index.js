const express = require('express');

module.exports = (dependencies, moduleName) => {
  const router = express.Router();
  const controllers = require('./controllers')(dependencies);
  const {requiresAPILogin} = dependencies('authorizationMW');
  const moduleMW = dependencies('moduleMW');
  const { loadDomainByHostname } = dependencies('domainMW');

  router.all('/*',
    moduleMW.requiresModuleIsEnabledInCurrentDomain(moduleName)
  );

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
   *                 $ref: '#/definitions/conferenceType'
   *       responses:
   *         201:
   *           $ref: "#/responses/conf_201"
   *         401:
   *           $ref: "#/responses/cm_401"
   *         403:
   *           $ref: "#/responses/cm_403"
   */
  router.put('/', loadDomainByHostname, requiresAPILogin, controllers.createConference);

  /**
   * @swagger
   *   /api/conference/{publicId}:
   *     post:
   *       tags:
   *         - VideoConference
   *       description: Retreives a conference by its ID
   *       parameters:
   *         - name: conferenceName
   *           in: path
   *           required: true
   *           description: conference ID
   *           type: string
   *       responses:
   *         201:
   *           $ref: "#/responses/conf_201"
   *         401:
   *           $ref: "#/responses/cm_401"
   *         403:
   *           $ref: "#/responses/cm_403"
   */
  router.get('/:publicId', loadDomainByHostname, controllers.getConferenceByPublicId);

  return router;
};
