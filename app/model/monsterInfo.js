'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;
  const MonsterInfo = app.model.define('monster_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(100),
    instance_or_monster: BOOLEAN,
    instance_id: INTEGER,
    instance_type: INTEGER(1),
    sort: INTEGER,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  MonsterInfo.associate = () => {
    MonsterInfo.belongsTo(MonsterInfo, { as: 'instance', foreignKey: 'instance_id', targetKey: 'id' });
  };
  return MonsterInfo;
};
