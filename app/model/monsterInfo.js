'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;
  const MonsterInfo = app.model.define('monster_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(100),
    instance_or_monster: BOOLEAN,
    instance_id: INTEGER,
    instance_type: BOOLEAN,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return MonsterInfo;
};
