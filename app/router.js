'use strict';
const PRRFIX = '';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  app.router.post(PRRFIX + '/login/login', app.controller.login.login);

  app.router.post(PRRFIX + '/user/userinfo', app.controller.user.userinfo);


};

