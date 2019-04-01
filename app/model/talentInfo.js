'use strict';

module.exports = app => {
  const { STRING, INTEGER, CHAR } = app.Sequelize;
  const TalentInfo = app.model.define('talent_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    profession_id: { type: INTEGER, unique: true },
    talent_name: { type: STRING(50), unique: true },
    battle_site: CHAR(1),
    close_or_far: CHAR(1),
  });
  TalentInfo.associate = () => {
    TalentInfo.belongsTo(app.model.ProfessionInfo, { as: 'profession', foreignKey: 'profession_id' });
  };
  return TalentInfo;
};
