import { describe, it } from 'mocha';
import chai from 'chai';
import { jsonIsEmpty as validate } from '../utils/validate';

const { expect } = chai;

// Testing validate function
describe('validate JSON', () => {
  it('Returns True if JSON is empty', (done) => {
    expect(validate({})).to.equal(true);
    done();
  });

  it('Returns True if invalid value is entered', (done) => {
    expect(validate('dsdssasa')).to.equal(true);
    done();
  });

  it('Returns True if null value is entered', (done) => {
    expect(validate(null)).to.equal(true);
    done();
  });

  it('Returns false if JSON is NOT empty', (done) => {
    expect(validate({ name: 'ben' })).to.equal(false);
    done();
  });
  it('Returns True if array is entered', (done) => {
    expect(validate('{a: 1}')).to.equal(true);
    done();
  });
});
