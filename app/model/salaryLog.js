'use strict';

module.exports = app => {
  const { INTEGER, DECIMAL, TEXT, DATE } = app.Sequelize;
  const SalaryLog = app.model.define('salary_log', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: { type: INTEGER, unique: true },
    type: { type: INTEGER, unique: true },
    money: DECIMAL(10, 2),
    reason: TEXT,
    exec_id: INTEGER,
    exec_time: DATE,
  });
  SalaryLog.associate = () => {
    SalaryLog.belongsTo(app.model.UserInfo, { foreignKey: 'exec_id' });
  };
  return SalaryLog;
};
