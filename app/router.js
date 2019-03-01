'use strict';
const PRRFIX = '';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();
  router.get('/', controller.home.index);

  app.router.post(PRRFIX + '/login/login', app.controller.login.login);

  app.router.post(PRRFIX + '/user/userinfo', jwt, app.controller.user.userinfo);


};

