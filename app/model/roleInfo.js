'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const RoleInfo = app.model.define('role_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_name: STRING(100),
    role_rule: STRING(255),
    role_description: TEXT,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  RoleInfo.associate = function() {
    RoleInfo.hasMany(app.model.UserInfo, { foreignKey: 'role_id' });
  };
  return RoleInfo;
};
