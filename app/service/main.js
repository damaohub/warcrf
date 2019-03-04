'use strict';

class MainService extends require('egg').Service {
  async roleList(currentPage, pageSize) {
    const result = await this.ctx.model.RaceInfo.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }
  async roleAdd(raceName) {
    const result = await this.ctx.model.RaceInfo.findOrCreate({
      where: { race_name: raceName },
    });
    // if (result[1]) {
    //   return result[0];
    // }
    return result;
  }
  async raceEdit(id, raceName) {
    const result = await this.ctx.model.RaceInfo.update({
      race_name: raceName,
    }, {
      where: { id },
    });
    return result;
  }
}


module.exports = MainService;
