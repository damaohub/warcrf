'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, DECIMAL } = app.Sequelize;

  const UserData = app.model.define('user_data', {

    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: { type: INTEGER },
    real_name: STRING(30),
    id_card: STRING(18),
    card_img_front: TEXT,
    card_img_behind: TEXT,
    basic_salary: DECIMAL(10, 2),
    qq: STRING(15),
    entry_time: DATE,
    leave_time: DATE,
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  return UserData;
};
