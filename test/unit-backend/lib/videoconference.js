const { expect } = require('chai');
const sinon = require('sinon');
const { DEFAULT_APP_URL } = require('../../../backend/lib/constants');

describe('The videconference lib', function() {
  let esnConfig, getFromAllDomains, inModule, domainId;

  beforeEach(function() {
    domainId = 'The domainId';
    getFromAllDomains = sinon.stub();
    inModule = sinon.stub().returns({ getFromAllDomains });
    esnConfig = sinon.stub().returns({ inModule });

    this.moduleHelpers.addDep('esn-config', esnConfig);
    this.moduleHelpers.addDep('db', {
      mongo: {
        mongoose: {
          model: sinon.spy()
        }
      }
    });

    this.requireModule = () => require('../../../backend/lib/videoconference')(this.moduleHelpers.dependencies);
  });

  describe('The getAppUrl function', function() {
    it('should return default value when configuration retrieval fails', function(done) {
      getFromAllDomains.returns(Promise.reject(new Error('I failed to get configuration')));

      this.requireModule().getAppUrl(domainId)
        .then(url => {
          expect(url).to.equal(DEFAULT_APP_URL);
          expect(inModule).to.have.been.calledWith('linagora.esn.videoconference');
          expect(esnConfig).to.have.been.calledWith('openPaasVideoconferenceAppUrl');
          expect(getFromAllDomains).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('should return default value when no configurations are defined', function(done) {
      getFromAllDomains.returns(Promise.resolve());

      this.requireModule().getAppUrl(domainId)
        .then(url => {
          expect(url).to.equal(DEFAULT_APP_URL);
          expect(inModule).to.have.been.calledWith('linagora.esn.videoconference');
          expect(esnConfig).to.have.been.calledWith('openPaasVideoconferenceAppUrl');
          expect(getFromAllDomains).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('should return default value when configurations are empty', function(done) {
      getFromAllDomains.returns(Promise.resolve([]));

      this.requireModule().getAppUrl(domainId)
        .then(url => {
          expect(url).to.equal(DEFAULT_APP_URL);
          expect(inModule).to.have.been.calledWith('linagora.esn.videoconference');
          expect(esnConfig).to.have.been.calledWith('openPaasVideoconferenceAppUrl');
          expect(getFromAllDomains).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('should return default value when no configurations are defined for given domain', function(done) {
      getFromAllDomains.returns(Promise.resolve([
        {
          domainId: `!${domainId}`,
          config: 'http://open-paas.org/videoconference/'
        }
      ]));

      this.requireModule().getAppUrl(domainId)
        .then(url => {
          expect(url).to.equal(DEFAULT_APP_URL);
          expect(inModule).to.have.been.calledWith('linagora.esn.videoconference');
          expect(esnConfig).to.have.been.calledWith('openPaasVideoconferenceAppUrl');
          expect(getFromAllDomains).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('should return default value when domain configuration is defined but not config entry', function(done) {
      getFromAllDomains.returns(Promise.resolve([
        { domainId }
      ]));

      this.requireModule().getAppUrl(domainId)
        .then(url => {
          expect(url).to.equal(DEFAULT_APP_URL);
          expect(inModule).to.have.been.calledWith('linagora.esn.videoconference');
          expect(esnConfig).to.have.been.calledWith('openPaasVideoconferenceAppUrl');
          expect(getFromAllDomains).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });

    it('should return defined value when configurations are defined for given domain', function(done) {
      const config = 'http://open-paas.org/videoconference/';

      getFromAllDomains.returns(Promise.resolve([{ domainId, config }]));

      this.requireModule().getAppUrl(domainId)
        .then(url => {
          expect(url).to.deep.equal(config);
          expect(inModule).to.have.been.calledWith('linagora.esn.videoconference');
          expect(esnConfig).to.have.been.calledWith('openPaasVideoconferenceAppUrl');
          expect(getFromAllDomains).to.have.been.calledOnce;
          done();
        })
        .catch(done);
    });
  });
});
