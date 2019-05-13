'use strict';

class MainService extends require('egg').Service {

  /**
   * 标准化数据，使参数符合入库标准
   * @param {Object} params
   * @param {Boolean} isComon 是否前后带逗号
   */

  async normalizeData(params = {}, isComon) {
    Object.keys(params).map(key => {
      if (Array.isArray(params[key])) {
        const tmpStr = params[key].join(',');
        params[key] = isComon ? `,${tmpStr},` : tmpStr;
      }
      return key;
    });
    return params;
  }

  /**
   * 获取列表(选填过滤条件、属性)
   * @param {string} modelName 所操作的模型名
   * @param {object} filter 过滤条件 默认null
   * @param {Array} attributes 属性，默认null
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

  async getList(modelName, filter = null) {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model[modelName].findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      raw: true,
      where: filter,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }


  /**
  *增加新数据，findOrCreate returns an array containing the object that was found or created and a boolean that
     will be true if a new object was created and false if not
  * @param {object} params: where 条件,sqlunique123字段检测是否已存在字段，必须是该对象已存在字段名
  * @param {string} modelName 所操作的模型名
  * @param {Bealean} isComon 序列化params中的数组后前面是否需要加逗号
  * @param {Bealean} t 是否需要传递事务参数
  */

  async addItem(modelName, params, isComon = false, t = false) {
    const special = {};
    if (params.hasOwnProperty('unique123')) {
      const param = params.unique123;
      if (Array.isArray(param)) {
        for (let i = 0, len = param.length; i < len; i++) {
          special[param[i]] = params[param[i]];
        }
      } else {
        special[param] = params[param];
      }
      delete params.unique123;
      delete params[param];
    }
    const options = {};
    const normalizeParams = await this.normalizeData(params, isComon);
    if (Object.keys(special).length !== 0) {
      options.where = special;
      options.defaults = normalizeParams;
    } else {
      options.where = normalizeParams;
    }
    if (t) {
      const trs = await this.ctx.model.transaction();
      options.transaction = t || trs;
    }
    const result = await this.ctx.model[modelName].findOrCreate(options);
    return result;
  }

  /**
   * 通过Id修改数据，返回影响行数
   * @param {string} modelName 所操作的模型名
   * @param {string} id where 条件
   * @param {object} params 修改的字段
   */

  async editItem(modelName, id, params, isComon = false) {
    const normalizeParams = await this.normalizeData(params, isComon);
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
    const { currentPage = 1, pageSize = 10, profession_id } = this.ctx.request.body;
    const result = await this.ctx.model.TalentInfo.findAndCountAll({
      where: profession_id ? { profession_id } : null,
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

  async equipList() { // 获取副本通过嵌套关联实现
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.EquipInfo.findAndCountAll({
      attributes: [ 'id', 'equip_name', 'equip_type', 'equip_location', 'talent_ids', 'monster_id', [ this.ctx.model.col('monster.name'), 'monster_name' ], [ this.ctx.model.col('monster->instance.name'), 'instance_name' ]],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: [
        {
          model: this.ctx.model.MonsterInfo, as: 'monster', attributes: [],
          include: [
            {
              model: this.ctx.model.MonsterInfo, as: 'instance', attributes: [],
            },
          ],
        },
      ],
      raw: true,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }

  async accountList() {
    const { currentPage = 1, pageSize = 10, account_name, game_role_name, type, organization, profession_id, region_id } = this.ctx.request.body;
    const filter = {};
    if (account_name) Object.assign(filter, { account_name });
    if (game_role_name) Object.assign(filter, { game_role_name });
    if (type) Object.assign(filter, { type });
    if (organization) Object.assign(filter, { organization });
    if (profession_id) Object.assign(filter, { profession_id });
    if (region_id) Object.assign(filter, { region_id });
    const result = await this.ctx.model.AccountInfo.findAndCountAll({
      attributes: { include: [[ this.ctx.model.col('profession_info.profession_name'), 'profession_name' ]] },
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: { model: this.ctx.model.ProfessionInfo, attributes: [] },
      raw: true,
      where: filter,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }
  async orderList() {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.OrderInfo.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: [{ model: this.ctx.model.AccountInfo, as: 'account' }, { model: this.ctx.model.OrderItems, as: 'items' }],
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }
  async orderInfo() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.model.OrderInfo.findByPk(id, {
      include: [{ model: this.ctx.model.AccountInfo, as: 'account' }, { model: this.ctx.model.OrderItems, as: 'items' }],
    });
    return result;
  }

}


module.exports = MainService;
