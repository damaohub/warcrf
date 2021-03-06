'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL, TEXT, DATE } = app.Sequelize;
  const OrderInfo = app.model.define('order_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    aid: { type: INTEGER, unique: true },
    phone: STRING(15),
    status: { type: STRING(1), unique: true },
    money: DECIMAL(12, 2),
    remark: TEXT,
    uid: INTEGER,
    order_type: { type: STRING(1), unique: true },
    create_time: { type: DATE, unique: true },
    finish_time: DATE,
  });
  OrderInfo.associate = () => {
    OrderInfo.belongsTo(app.model.AccountInfo, { as: 'account', foreignKey: 'aid' });
    OrderInfo.hasMany(app.model.OrderItems, { as: 'items', foreignKey: 'oid' });
  };
  return OrderInfo;
};
