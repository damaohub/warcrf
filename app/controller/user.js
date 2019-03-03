'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async userinfo() {
    const { ctx } = this;
    const params = ctx.helper.verifyToken(ctx.request.body.token);
    const userData = await ctx.service.user.dataById(params.id);
    const plainData = userData.get({ plain: true });
    const { detail, role } = plainData;
    delete plainData.detail;
    delete plainData.role;
    delete plainData.password;
    delete detail.id;
    delete detail.uid;
    delete role.id;
    const data = Object.assign(plainData, detail, role);
    ctx.body = { ret: 0, data, msg: 'ok' };
  }
}
module.exports = UserController;
