'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const EquipInfo = app.model.define('equip_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    equip_name: STRING(100),
    equip_type: STRING(10),
    equip_location: STRING(10),
    talent_ids: STRING(10),
    monster_id: STRING(10),
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  return EquipInfo;
};
