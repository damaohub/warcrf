'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const RuleInfo = app.model.define('rule_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rule_name: STRING(50),
    rule_api: STRING(100),
    pid: INTEGER,
    sort: INTEGER,
    is_api: STRING(1),
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return RuleInfo;
};
