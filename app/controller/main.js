'use strict';
const Controller = require('egg').Controller;
class MainController extends Controller {
  async raceList() {
    const { ctx } = this;
    const { currentPage = 1, pageSize = 10 } = ctx.request.body;
    const data = await ctx.service.main.roleList(currentPage, pageSize);
    ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async raceAdd() {
    const { race_name } = this.ctx.request.body;
    const data = await this.ctx.service.main.roleAdd(race_name);
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: `您输入的种族“${data[0].race_name}”已存在` };
    }
  }
  async raceEdit() {
    const { id, race_name } = this.ctx.request.body;
    const data = await this.ctx.service.main.raceEdit(id, race_name);
    this.ctx.body = { ret: 0, data, msg: '修改成功！' };
  }
}
module.exports = MainController;
