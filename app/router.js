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

  app.router.post(PRRFIX + '/user/userinfo', jwt, controller.user.userInfoByToken);
  app.router.post(PRRFIX + '/user/list', jwt, controller.user.userList);
  app.router.post(PRRFIX + '/user/add', jwt, controller.user.userAdd);
  app.router.post(PRRFIX + '/user/getaway', jwt, controller.user.userGetAway);
  app.router.post(PRRFIX + '/user/info', jwt, controller.user.userInfo);
  app.router.post(PRRFIX + '/user/perfectdata', jwt, controller.user.perfectData);
  app.router.post(PRRFIX + '/user/upload-cardimg', jwt, controller.user.uploadCardimg);
  app.router.post(PRRFIX + '/user/salary', jwt, controller.user.salary);
  app.router.post(PRRFIX + '/user/reward-punishment', jwt, controller.user.rewardPunishment);

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
  app.router.post(PRRFIX + '/monster/instancelist', jwt, controller.main.instanceList);
  app.router.post(PRRFIX + '/monster/instancemonsters', jwt, controller.main.instanceMonsters);
  app.router.post(PRRFIX + '/monster/add', jwt, controller.main.monsterAdd);
  app.router.post(PRRFIX + '/monster/edit', jwt, controller.main.monsterEdit);
  app.router.post(PRRFIX + '/monster/del', jwt, controller.main.monsterDel);
  app.router.post(PRRFIX + '/monster/searchlist', jwt, controller.main.monsterSearch);

  app.router.post(PRRFIX + '/equip/locationtypelist', jwt, controller.main.locationTypeList);
  app.router.post(PRRFIX + '/equip/list', jwt, controller.main.equipList);
  app.router.post(PRRFIX + '/equip/add', jwt, controller.main.equipAdd);
  app.router.post(PRRFIX + '/equip/edit', jwt, controller.main.equipEdit);
  app.router.post(PRRFIX + '/equip/del', jwt, controller.main.equipDel);

  app.router.post(PRRFIX + '/rule/list', jwt, controller.main.ruleList);
  app.router.post(PRRFIX + '/rule/add', jwt, controller.main.ruleAdd);
  app.router.post(PRRFIX + '/rule/edit', jwt, controller.main.ruleEdit);
  app.router.post(PRRFIX + '/rule/addgroup', jwt, controller.main.ruleAddGroup);
  app.router.post(PRRFIX + '/rule/editgroup', jwt, controller.main.ruleEditGroup);

  app.router.post(PRRFIX + '/role/list', jwt, controller.main.roleList);
  app.router.post(PRRFIX + '/role/add', jwt, controller.main.roleAdd);
  app.router.post(PRRFIX + '/role/edit', jwt, controller.main.roleEdit);
  app.router.post(PRRFIX + '/role/editrule', jwt, controller.main.roleEditRule);

  app.router.post(PRRFIX + '/order/list', jwt, controller.main.orderList);
  app.router.post(PRRFIX + '/order/info', jwt, controller.main.orderInfo);
  app.router.post(PRRFIX + '/order/add', jwt, controller.main.orderAdd);

  app.router.post(PRRFIX + '/account/list', jwt, controller.main.accountList);
  app.router.post(PRRFIX + '/account/add', jwt, controller.main.accountAdd);
  app.router.post(PRRFIX + '/account/edit', jwt, controller.main.accountEdit);
  app.router.post(PRRFIX + '/account/del', jwt, controller.main.accountDel);

  app.router.post(PRRFIX + '/gamer/index', jwt, controller.main.gamerIndex);
};

