'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const OrderItems = app.model.define('order_items', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    oid: { type: INTEGER, unique: true },
    aid: { type: INTEGER, unique: true },
    instance_or_secret: { type: STRING(1), unique: true },
    instance_id: { type: INTEGER, unique: true },
    difficult: { type: STRING(10), unique: true },
    num: INTEGER,
    finish_num: INTEGER,
    last_finish_time: DATE,
    week_used: { type: STRING(1), unique: true },
    status: { type: STRING(1), unique: true },
    create_time: { type: DATE, unique: true },
  });
  OrderItems.associate = () => {

  };

  return OrderItems;
};
