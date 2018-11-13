const { EVENTS } = require('./constants');

module.exports = dependencies => {
  const logger = dependencies('logger');
  const pubsub = dependencies('pubsub');
  const ioHelper = dependencies('wsserver').ioHelper;
  let namespace;

  return {
    init
  };

  function init(videoconferenceNamespace) {
    namespace = videoconferenceNamespace;

    listenToIncomingCalls();
    listenToWebsocketMessages();
  }

  function listenToIncomingCalls() {
    const incomingCallTopic = EVENTS.INCOMING_CALL;
    const acceptedCallTopic = EVENTS.ACCEPTED_CALL;

    logger.debug(`Subscribing to ${incomingCallTopic} global topic for videoconference incoming calls`);
    pubsub.global.topic(incomingCallTopic).subscribe(message => {
      logger.debug(`Received a message on global topic ${incomingCallTopic}`, message);
      sendTo(message.to, incomingCallTopic, message);
    });

    logger.debug(`Subscribing to ${acceptedCallTopic} global topic for videoconference accepted calls`);
    pubsub.global.topic(acceptedCallTopic).subscribe(message => {
      logger.debug(`Received a message on global topic ${acceptedCallTopic}`, message);
      // when a call is accepted, notify the callee so that we close all the notifications
      // TODO: Notify the caller so that he knows that the user accepted in OP
      sendTo(message.to, acceptedCallTopic, message);
    });
  }

  function listenToWebsocketMessages() {
    logger.debug('Listening videoconference websocket messages');

    namespace.on('connection', socket => {
      const userId = ioHelper.getUserId(socket);

      logger.info(`New connection on videoconference by user ${userId}`);

      socket.on('message', message => {
        message = message || {};
        message.from = userId;
        // push the message in a message.type topic
        message.type && pubsub.global.topic(message.type).publish(message);
      });
    });
  }

  function sendTo(userId, type, message) {
    logger.debug(`Incoming call message, notifiying ${userId}`, message);

    const sockets = ioHelper.getUserSocketsFromNamespace(userId, namespace.sockets) || [];

    sockets.forEach(socket => socket.emit(type, message));
  }
};
