'use strict';
const crypto = require('crypto');
const Controller = require('egg').Controller;


class LoginController extends Controller {
  async login() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    const userData = await service.user.find(params.username);
    if (userData) {
      const md5Password = crypto.createHash('md5').update(params.password).digest('hex');
      if (md5Password !== userData.password) {
        this.ctx.body = { ret: 2002, msg: '密码错误！' };
      } else {
        const token = this.ctx.helper.loginToken({ id: userData.id, username: userData.username }, 7200);
        await service.user.generateToken(token, userData.id);
        const user = await service.user.infoById(userData.id);
        this.ctx.body = { ret: 0, data: { token: user.login_token }, msg: '登录成功' };
      }
    } else {
      this.ctx.body = { ret: 2002, msg: '用户不存在' };
    }
  }

  async logout() {
    this.ctx.body = 'hi, egg';
  }

}

module.exports = LoginController;
