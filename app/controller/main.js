'use strict';
const Controller = require('egg').Controller;
class MainController extends Controller {
  // race
  async raceList() {
    const { ctx } = this;
    const data = await ctx.service.main.getList('RaceInfo');
    ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async raceAdd() {
    const { race_name } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('RaceInfo', { race_name });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: `您输入的种族“${data[0].race_name}”已存在` };
    }
  }
  async raceEdit() {
    const { id, race_name } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.raceEdit(id, race_name);
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, race_name }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async raceDel() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.service.main.raceDel(id);
    if (result) { // 返回 1 删除成功, 0 失败
      this.ctx.body = { ret: 0, data: { id }, msg: '已经删除！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '删除失败' };
    }
  }
  // profession
  async professionList() {
    const data = await this.ctx.service.main.getList('ProfessionInfo');
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async professionAdd() {
    const { profession_name } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('ProfessionInfo', { profession_name });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: `您输入的种族“${data[0].profession_name}”已存在` };
    }
  }

  // talent
  async talentList() {
    const data = await this.ctx.service.main.talentList();
    // const data = await this.ctx.service.main.getList('TalentInfo');
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async talentAdd() {
    const { profession_id, talent_name } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('TalentInfo', { profession_id, talent_name });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: `您输入的种族“${data[0].race_name}”已存在` };
    }
  }

  // gamer
  async gamerIndex() {
    const data = { my_team: [] };
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
}

module.exports = MainController;
