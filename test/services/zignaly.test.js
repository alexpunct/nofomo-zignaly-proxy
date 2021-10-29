const assert = require('assert');
const app = require('../../src/app');

describe('\'zignaly\' service', () => {
  it('registered the service', () => {
    const service = app.service('zignaly');

    assert.ok(service, 'Registered the service');
  });
});
