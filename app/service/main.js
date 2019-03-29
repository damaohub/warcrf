'use strict';

class MainService extends require('egg').Service {

  /**
   * 标准化数据，使参数符合入库标准
   * @param {Object} params
   */

  async normalizeData(params = {}) {
    Object.keys(params).map(key => {
      if (Array.isArray(params[key])) {
        const tmpStr = params[key].join(',');
        params[key] = `,${tmpStr},`;
      }
      return key;
    });
    return params;
  }

  /**
   * 获取列表(选填过滤条件、属性)
   * @param {string} modelName 所操作的模型名
   * @param {object} filter 过滤条件 默认null
   * @param {Array} filter 属性，默认null
   */

  async list(modelName, filter = null, attributes = null) {
    const result = await this.ctx.model[modelName].findAll({
      where: filter,
      attributes,
      raw: true,
    });
    return result;
  }

  /**
   *获取带分页的列表数据
  * @param {string} modelName: 所操作的模型名
  */

  async getList(modelName) {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model[modelName].findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      raw: true,
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
    const normalizeParams = await this.normalizeData(params);
    const result = await this.ctx.model[modelName].findOrCreate({
      where: normalizeParams,
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
    const normalizeParams = await this.normalizeData(params);
    const result = await this.ctx.model[modelName].update(normalizeParams, {
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

  // 关联自己
  async monsterList() {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.MonsterInfo.findAndCountAll({
      attributes: [ 'id', 'name', 'instance_or_monster', 'instance_id', 'instance_type', 'sort', [ this.ctx.model.col('instance.name'), 'instance_name' ]],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: { model: this.ctx.model.MonsterInfo, as: 'instance', attributes: [ ] },
      raw: true,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }

  // 远程搜索，模糊查询
  async monsterSearch(value) {
    const result = await this.ctx.model.MonsterInfo.findAll({
      where: {
        name: {
          [this.ctx.model.Op.like]: `%${value}%`,
        },
      },
    });
    return result;
  }

  async equipList() {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.EquipInfo.findAndCountAll({
      attributes: [ 'id', 'equip_name', 'equip_type', 'equip_location', 'talent_ids', 'monster_id', [ this.ctx.model.col('monster.name'), 'monster_name' ]],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: { model: this.ctx.model.MonsterInfo, as: 'monster', attributes: [ ] },
      raw: true,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }

}


module.exports = MainService;
