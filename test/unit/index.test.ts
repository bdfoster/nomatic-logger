import 'mocha';
import {expect} from 'chai';
import {create, register, find, get, Logger, instances} from '../../src';

beforeEach(() => {
  for (let i = instances.length; i > 0; i--) {
    instances.pop();
  }
});

describe('create()', () => {
  it('should create a Logger with specified `namespace`', () => {
    expect(create({namespace: 'test'})).to.exist;
  });
});

describe('register()', () => {
  const logger = new Logger({
    namespace: 'test'
  });

  it('should register a pre-existing Logger instance', () => {
    register(logger);
  });

  it('should throw when namespace already is registered', (done) => {
    register(logger);
    try {
      register(logger);
      return done(new Error('Did not throw!'));
    } catch (error) {
      if (error.message === 'Logger already registered to namespace: test') {
        return done();
      }

      return done(error);
    }
  });
});

describe('find()', () => {
  it('should return a Logger already registered to a namespace', () => {
    create({namespace: 'test2'});
    expect(find(create({namespace: 'test'}).namespace)).to.not.be.null;
  });

  it('should return null if no logger is registered in namespace', () => {
    expect(find('superloggerthing')).to.be.null;
  });
});

describe('get()', () => {
  it('should either find existing or create new logger', () => {
    const logger = get('test');
    expect(logger).to.equal(get(logger.namespace));
  });
});
