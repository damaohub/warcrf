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
  *增加新数据，findOrCreate returns an array containing the object that was found or created and a boolean that
     will be true if a new object was created and false if not
  * @param {object} params: where 条件
  * @param {string} modelName 所操作的模型名
  */

  async addItem(modelName, params) {
    const result = await this.ctx.model[modelName].findOrCreate({
      where: params,
    });
    return result;
  }

  /**
   * 通过Id修改数据，返回影响行数
   * @param {string} modelName 所操作的模型名
   * @param {string} id where 条件
   * @param {object} params 修改的字段
   */

  async editItem(modelName, id, params) {
    const result = await this.ctx.model[modelName].update(params, {
      where: { id },
    });
    return result;
  }

  /**
   * 通过Id删除数据，返回 1 删除成功, 0 失败
   * @param {string} modelName 所操作的模型名
   * @param {*} id where 条件
   */

  async delItem(modelName, id) {
    const result = await this.ctx.model[modelName].destroy({
      where: { id },
    });
    return result;
  }

  // 联表查询
  async talentList() {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.TalentInfo.findAndCountAll({
      attributes: [ 'id', 'profession_id', 'talent_name', this.ctx.model.col('profession.profession_name'), this.ctx.model.col('profession.profession_img') ],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: { model: this.ctx.model.ProfessionInfo, as: 'profession', attributes: [ ] },
      raw: true,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }

}


module.exports = MainService;
