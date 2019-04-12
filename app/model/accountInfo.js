'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const AccountInfo = app.model.define('account_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    account_name: STRING,
    account_pwd: STRING(50),
    child_name: STRING,
    game_role_name: STRING,
    organization: { type: INTEGER(1), unique: true },
    profession_id: { type: INTEGER, unique: true },
    talent_id: { type: STRING(30), unique: true },
    level: INTEGER(4),
    equip_level: INTEGER(6),
    status: { type: STRING(1), unique: true },
    region_id: STRING,
    type: INTEGER(1),
    need_talent_id: INTEGER,
    battle_site: STRING(30),
    account_phone: STRING(20),
    account_remark: TEXT,
  });
  AccountInfo.associate = () => {
    AccountInfo.belongsTo(app.model.ProfessionInfo, { foreignKey: 'profession_id' });
  };

  return AccountInfo;
};
