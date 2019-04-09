'use strict';
const moment = require('moment');
class UserService extends require('egg').Service {
  async infoByName(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.model.UserInfo.findOne({ where: { username: name } });
    // const user = await this.ctx.db.query('select * from user_info where uid = ?', uid);
    return user;
  }
  async infoById(id) {
    const user = await this.ctx.model.UserInfo.findOne({ where: { id }, raw: true });
    // const user = await this.ctx.db.query('select * from user_info where uid = ?', uid);
    return user;
  }
  async generateToken(token, id) {
    const row = await this.ctx.model.UserInfo.update({ login_token: token }, { where: { id } });
    return row;
  }
  async dataById(id) {
    const user = await this.ctx.model.UserInfo.findOne({
      attributes: [
        'id',
        'last_login_time',
        'username',
        'status',
        'role_id',
        this.ctx.model.col('detail.basic_salary'),
        this.ctx.model.col('detail.card_img_behind'),
        this.ctx.model.col('detail.card_img_front'),
        this.ctx.model.col('detail.entry_time'),
        this.ctx.model.col('detail.id_card'),
        this.ctx.model.col('detail.real_name'),
        this.ctx.model.col('detail.leave_time'),
        this.ctx.model.col('detail.qq'),
        this.ctx.model.col('role.role_name'),
      ],
      where: { id },
      include: [{ model: this.ctx.model.UserData, as: 'detail', attributes: [ ] }, { model: this.ctx.model.RoleInfo, as: 'role', attributes: [ ] }],
      raw: true,
    });
    return user;
  }
  async userList() {
    const { currentPage = 1, pageSize = 10 } = this.ctx.request.body;
    const result = await this.ctx.model.UserInfo.findAndCountAll({
      attributes: [
        'id',
        'last_login_time',
        'username',
        'status',
        'role_id',
        this.ctx.model.col('detail.basic_salary'),
        this.ctx.model.col('detail.card_img_behind'),
        this.ctx.model.col('detail.card_img_front'),
        this.ctx.model.col('detail.entry_time'),
        this.ctx.model.col('detail.id_card'),
        this.ctx.model.col('detail.real_name'),
        this.ctx.model.col('detail.leave_time'),
        this.ctx.model.col('detail.qq'),
        this.ctx.model.col('role.role_name'),
      ],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: [{ model: this.ctx.model.UserData, as: 'detail', attributes: [ ] }, { model: this.ctx.model.RoleInfo, as: 'role', attributes: [ ] }],
      raw: true,
      order: [[ 'status', 'DESC' ]],
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }
  async salaryList() {
    const { currentPage = 1, pageSize = 10, id } = this.ctx.request.body;
    const result = await this.ctx.model.SalaryLog.findAndCountAll({
      where: { uid: id },
      attributes: [
        'id',
        'uid',
        'type',
        'money',
        'reason',
        'reason',
        'exec_time',
        [ this.ctx.model.col('user_info->detail.real_name'), 'exec_name' ], // 两层include语法为layer1->layer2.col
        [ this.ctx.model.col('user_info->role.role_name'), 'exec_role' ],
        [ this.ctx.model.col('user_info->role.id'), 'exec_id' ],
      ],
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      include: [{ model: this.ctx.model.UserInfo,
        include: [
          { model: this.ctx.model.RoleInfo, as: 'role', attributes: [] },
          { model: this.ctx.model.UserData, as: 'detail', attributes: [] },
        ],
        raw: true,
        attributes: [],
      }],
      raw: true,
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };

  }
  async salary() {
    const { id } = this.ctx.request.body;
    const sql = 'SELECT (SUM(CASE WHEN (`type` = 1 OR `type` = 3) THEN `money` ELSE 0 END) - SUM(CASE WHEN `type` = 2 THEN `money` ELSE 0 END) ) as `money` FROM `salary_log` WHERE `uid` = :uid AND `exec_time` >= "' + moment().date(1).format('YYYY-MM-DD 00:00:00') + '"';
    const result = await this.ctx.model.query(sql, { replacements: { uid: id }, type: this.ctx.model.QueryTypes.SELECT });
    return result[0];
  }
}

module.exports = UserService;
