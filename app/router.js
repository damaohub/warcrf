'use strict';
const PRRFIX = '';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();
  router.get('/', controller.home.index);

  // api
  app.router.post(PRRFIX + '/login/login', app.controller.login.login);

  app.router.post(PRRFIX + '/user/userinfo', jwt, app.controller.user.userinfo);

  app.router.post(PRRFIX + '/gamerole/racelist', jwt, app.controller.main.raceList);
  app.router.post(PRRFIX + '/gamerole/raceadd', jwt, app.controller.main.raceAdd);
  app.router.post(PRRFIX + '/gamerole/raceedit', jwt, app.controller.main.raceEdit);
};

