'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const UserInfo = app.model.define('user_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_id: { type: INTEGER },
    username: STRING(100),
    password: STRING(32),
    status: {
      type: TEXT('tiny'),
      set: () => {
        this.getDataValue('status') === 1 ? '在职' : '离职';
      },
    },
    login_token: STRING,
    last_login_time: DATE,
  });
  UserInfo.associate = function() {
    UserInfo.hasOne(app.model.UserData, { as: 'detail', foreignKey: 'uid' });
    UserInfo.belongsTo(app.model.RoleInfo, { as: 'role', foreignKey: 'role_id' });
  };
  return UserInfo;
};
