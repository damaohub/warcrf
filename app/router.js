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
  app.router.post(PRRFIX + '/login/login', controller.login.login);

  app.router.post(PRRFIX + '/user/userinfo', jwt, controller.user.userinfo);


  app.router.post(PRRFIX + '/gamerole/racelist', jwt, controller.main.raceList);
  app.router.post(PRRFIX + '/gamerole/raceadd', jwt, controller.main.raceAdd);
  app.router.post(PRRFIX + '/gamerole/raceedit', jwt, controller.main.raceEdit);
  app.router.post(PRRFIX + '/gamerole/racedel', jwt, controller.main.raceDel);

  app.router.post(PRRFIX + '/gamerole/professionlist', jwt, controller.main.professionList);
  app.router.post(PRRFIX + '/gamerole/professionadd', jwt, controller.main.professionAdd);
  app.router.post(PRRFIX + '/gamerole/professionedit', jwt, controller.main.professionEdit);
  app.router.post(PRRFIX + '/gamerole/professiondel', jwt, controller.main.professionDel);

  app.router.post(PRRFIX + '/gamerole/talentlist', jwt, controller.main.talentList);
  app.router.post(PRRFIX + '/gamerole/talentadd', jwt, controller.main.talentAdd);
  app.router.post(PRRFIX + '/gamerole/talentedit', jwt, controller.main.talentEdit);
  app.router.post(PRRFIX + '/gamerole/talentdel', jwt, controller.main.talentDel);

  app.router.post(PRRFIX + '/monster/list', jwt, controller.main.monsterList);


  app.router.post(PRRFIX + '/gamer/index', jwt, controller.main.gamerIndex);
};

