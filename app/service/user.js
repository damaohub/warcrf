'use strict';

class UserService extends require('egg').Service {
  async find(name) {
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
    const user = await this.ctx.model.UserInfo.update({ login_token: token }, { where: { id } });
    return user;
  }
  async findUserById(uId) {
    const user = await this.ctx.model.UserData.findOne({ where: { uid: uId } });
    return user;
  }
}

module.exports = UserService;
