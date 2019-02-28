'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/login.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /login/login', () => {
    return app.httpRequest()
      .post('/login/login')
      .expect({ code: 200, msg: 'ok' })
      .expect(200);
  });
});
