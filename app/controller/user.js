'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async userinfo() {
    const { ctx } = this;
    const params = ctx.helper.verifyToken(ctx.request.body.token);
    const data = await ctx.service.user.dataById(params.id);
    ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async userList() {
    const data = await this.ctx.service.user.userList();
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async userAdd() {
    const { username, password, role_id } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('UserInfo', { username, password, role_id, sqlunique123: 'username' });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: `您输入的手机号“${data[0].username}”已存在` };
    }
  }
  async userGetAway() {
    const { id } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('UserInfo', id, { status: 0 });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
}
module.exports = UserController;
