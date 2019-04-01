'use strict';

class UserService extends require('egg').Service {
  async infoByName(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.model.UserInfo.findOne({ where: { username: name } });
    // const user = await this.ctx.db.query('select * from user_info where uid = ?', uid);
    return user;
  }
  async infoById(id) {
    const user = await this.ctx.model.UserInfo.findById(id);
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
    });
    const list = result.rows;
    const pagination = { total: result.count, current: currentPage, pageSize };
    return { list, pagination };
  }
}

module.exports = UserService;
