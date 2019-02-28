'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async userinfo() {
    const { ctx } = this;
    const params = ctx.helper.verifyToken(ctx.request.body.token);
    const userInfo = await ctx.service.user.findUserById(params.id);
    ctx.body = { ret: 0, data: userInfo, msg: 'ok' };
  }
}
module.exports = UserController;
