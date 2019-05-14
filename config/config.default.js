'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545703846726_4924';

  // add your config here
  config.middleware = [];

  // config.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: 'localhost',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: '',
  //     // 数据库名
  //     database: 'youlan',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  // config.sequelize = {
  //   dialect: 'mysql',
  //   host: '127.0.0.1',
  //   port: 3306,
  //   database: '',
  //   user: 'root',
  //   password: '',
  //   // app: true,
  //   // agent: false,
  //   raw: true,
  //   define: {
  //     timestamps: false,
  //     freezeTableName: true,
  //   },
  //   dialectOptions: {
  //     useUTC: false, // for reading from database
  //     dateStrings: true,
  //     typeCast: (field, next) => { // for reading from database
  //       if (field.type === 'DATETIME') {
  //         return field.string();
  //       }
  //       return next();
  //     },
  //   },
  //   timezone: '+08:00', // 东八时区
  // };

  config.security = {
    csrf: {
      enable: false,
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      ignoreJSON: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      // ignore: '/api',
    },
  };
  config.KeyWordArr = {
    account_name: [ '帐号', '账号', '战网', '游戏账号', '游戏帐号', '通行证', '战网帐号', '战网账号', '登录账号', '登陆账号', '登陆帐号', '登录帐号' ],
    account_pwd: [ '密码', '登录密码', '登陆密码', '游戏密码' ],
    child_name: [ '子账号', '子帐号', '子战网' ],
    game_role_name: [ '角色名', '名字', '角色名称' ],
    organization: [ '阵营', '游戏阵营' ],
    profession_id: [ '职业' ],
    talent_id: [ '天赋', '可用天赋' ],
    level: [ '等级', '角色等级' ],
    equip_level: [ '装等', '装备等级', '装备等级（必填）' ],
    region_id: [ '服务器', '区服', '大区', '大区服务器' ],
    need_talent_id: [ '专精拾取', '拾取天赋', '拾取' ],
    phone: [ '电话', '手机号', '联系电话', '手机', '电话号', '手机号码', '电话号码', '（上号验证）电话' ],
    remark: [ '备注', '订单备注', 'R币备注', 'r币备注', 'roll币备注', 'Roll币备注', 'ROLL币', 'roll币', '特殊备注', '备注及要求（团本备注R币，不备注默认不R）', 'ROLL币需求（要求备注）' ],
    taobaoid: [ '订单编号', '订单号', '原定单编号' ],
  };
  return config;
};
