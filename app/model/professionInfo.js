'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const ProfessionInfo = app.model.define('profession_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    profession_name: STRING(50),
    profession_img: TEXT,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  ProfessionInfo.associate = () => {
    ProfessionInfo.hasMany(app.model.TalentInfo, { foreignKey: 'profession_id' });
  };
  return ProfessionInfo;
};
