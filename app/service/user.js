'use strict';

class UserService extends require('egg').Service {
  async infoByName(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.model.UserInfo.findOne({ where: { username: name } });
    // const user = await this.ctx.db.query('select * from user_info where uid = ?', uid);
    return user;
  }
  async infoById(id) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
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
      where: { id },
      include: [{ model: this.ctx.model.UserData, as: 'detail' }, { model: this.ctx.model.RoleInfo, as: 'role' }],
    });
    return user;
  }
}

module.exports = UserService;
