'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/main.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /rule/list', () => {
    return app.httpRequest()
      .post('/rule/list')
      .expect('hi, egg')
      .expect(200);
  });
});

