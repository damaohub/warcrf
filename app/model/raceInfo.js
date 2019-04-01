'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const RaceInfo = app.model.define('race_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    race_name: STRING(50),
  });
  return RaceInfo;
};
