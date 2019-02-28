'use strict';

class UserService extends require('egg').Service {
  async find(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('user_info', { username: name });
    // const user = await this.ctx.db.query('select * from user_info where uid = ?', uid);
    return user;
  }
  async findUserById(uId) {
    const user = await this.ctx.model.UserData('user_data', { uid: uId });
    return user;
  }
}

module.exports = UserService;
