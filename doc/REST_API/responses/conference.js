/**
 * @swagger
 * response:
 *   conf_201:
 *     description: OK. With queried conference
 *     schema:
 *       type: object
 *       properties:
 *       publicId:
 *         type: string
 *         description: The videoconference public ID
 *       conferenceName:
 *         type: string
 *         description:  the conference name
 *       type:
 *         $ref: '#/definitions/conferenceType'
 *       jitsiInstanceUrl:
 *         type: string
 *         format: url
 *     examples:
 *       {
 *         "4cda17bd-76d8-4342-94d9-36b80d6fa16d",
 *         "OpenPaaS",
 *         "public",
 *         "http://janus.hubl.in"
 *       }
 *
 *   conf_500:
 *     description: Your OpenPaaS domain id is unknown
 *     schema:
 *       type: object
 *       properties:
 *       status:
 *         type: number
 *       message:
 *         type: string
 *       details:
 *         type: string
 *     examples:
 *       {
 *         status: 500,
 *         message: 'Server Error',
 *         details: `Unknown OpenPaaS domain (given: undefined)`
 *       }
 */
