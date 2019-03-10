'use strict';

class MainService extends require('egg').Service {

/**
 *获取带分页的列表数据
 * @param {string} mothod: 所操作的模型名
 */

  async getList(mothod) {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model[mothod].findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }

  /**
  *获取带分页的列表数据
  * @param {object} params: where 条件
  * @param {stroong} modelName 所操作的模型名
  */

  async addItem(modelName, params) {
    const result = await this.ctx.model[modelName].findOrCreate({
      where: params,
    });
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
  async raceDel(id) {
    const result = await this.ctx.model.RaceInfo.destroy({
      where: {
        id,
      },
    });
    return result;
  }

  async talentList() {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.TalentInfo.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: { model: this.ctx.model.ProfessionInfo, as: 'profession' },
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }
}


module.exports = MainService;
