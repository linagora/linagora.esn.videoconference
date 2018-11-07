'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The VideoConfWebsocketTransportService factory', function() {
  var livenotification, options, transport, VideoConfWebsocketTransportService, $rootScope;
  var onSpy, sendSpy, successSpy, errorSpy;
  var VIDEOCONFERENCE_WEBSOCKET;

  beforeEach(function() {
    options = { room: '123' };
    onSpy = sinon.spy();
    sendSpy = sinon.spy();
    successSpy = sinon.spy();
    errorSpy = sinon.spy();
    livenotification = sinon.spy(function() {
      return {
        on: onSpy,
        send: sendSpy
      };
    });
  });

  beforeEach(function() {
    module('linagora.esn.videoconference', function($provide) {
      $provide.value('livenotification', livenotification);
    });
  });

  beforeEach(angular.mock.inject(function(_$rootScope_, _VideoConfWebsocketTransportService_, _VIDEOCONFERENCE_WEBSOCKET_) {
    $rootScope = _$rootScope_;
    VideoConfWebsocketTransportService = _VideoConfWebsocketTransportService_;
    VIDEOCONFERENCE_WEBSOCKET = _VIDEOCONFERENCE_WEBSOCKET_;
  }));

  beforeEach(function() {
    transport = new VideoConfWebsocketTransportService(options);
  });

  it('should instanciate correctly', function() {
    expect(transport.options).to.deep.equals(options);
    expect(transport.handlers).to.deep.equals({});
  });

  describe('The addEventListener function', function() {
    it('should add the listener to the sio instance if not null', function() {
      var event = 'message';
      var handler = function() {};

      transport.sio = {
        on: onSpy
      };

      transport.addEventListener(event, handler);

      expect(onSpy).to.have.been.calledWith(event, handler);
    });

    it('should cache the listener if the sio instance is null', function() {
      var event = 'message';
      var handler = function() {};

      transport.addEventListener(event, handler);

      expect(transport.handlers[event]).to.equals(handler);
      expect(onSpy).to.not.have.been.called;
    });
  });

  describe('The connect function', function() {
    it('should skip when sio is already defined', function() {
      transport.sio = { foo: 'bar' };

      transport.connect();

      expect(livenotification).to.not.have.been.called;
    });

    it('should initialize livenotification', function() {
      transport.connect();

      expect(livenotification).to.have.been.calledOnce;
      expect(livenotification).to.have.been.calledWith(VIDEOCONFERENCE_WEBSOCKET.NAMESPACE, options.room);
      expect(onSpy).to.have.been.calledOnce;
      expect(onSpy.firstCall.args[0]).to.equal('connected');
    });

    it('should register all the event listeners', function() {
      transport.handlers = {
        a: angular.noop,
        b: angular.noop
      };
      transport.connect();

      expect(livenotification).to.have.been.calledOnce;
      expect(onSpy.firstCall.args[0]).to.equal('a');
      expect(onSpy.secondCall.args[0]).to.equal('b');
      expect(onSpy.thirdCall.args[0]).to.equal('connected');
      expect(onSpy).to.have.been.calledThrice;
    });
  });

  describe('The sendMessage function', function() {
    var data;

    beforeEach(function() {
      data = { foo: 'bar' };
    });

    it('should reject when websocket is not connected', function() {
      transport.sendMessage(data).then(successSpy, errorSpy);
      $rootScope.$digest();

      expect(sendSpy).to.not.have.been.called;
      expect(successSpy).to.not.have.been.called;
      expect(errorSpy).to.have.been.called;
    });

    it('should send the message with the websocket instance', function() {
      var type = 'message';

      transport.sio = {
        send: sendSpy
      };

      transport.sendMessage(type, data).then(successSpy, errorSpy);
      $rootScope.$digest();

      expect(sendSpy).to.have.been.calledWith(type, data);
      expect(successSpy).to.have.been.calledWith(data);
      expect(errorSpy).to.not.have.been.called;
    });
  });
});
