'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const UserInfo = app.model.define('user_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_id: { type: INTEGER },
    username: STRING(100),
    password: STRING(32),
    status: TEXT('tiny'),
    login_token: STRING,
    last_login_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return UserInfo;
};
