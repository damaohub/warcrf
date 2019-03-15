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
    const data1 = await this.ctx.service.main.editItem('RaceInfo', id, { race_name });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, race_name }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async raceDel() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.service.main.delItem('RaceInfo', id);
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
  async professionEdit() {
    const { id, profession_name, profession_img } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('ProfessionInfo', id, { profession_name, profession_img });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, profession_name, profession_img }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async professionDel() {
    const { cid } = this.ctx.request.body;
    const result = await this.ctx.service.main.delItem('ProfessionInfo', cid);
    if (result) { // 返回 1 删除成功, 0 失败
      this.ctx.body = { ret: 0, data: { id: cid }, msg: '已经删除！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '删除失败' };
    }
  }

  // talent
  async talentList() {
    const data = await this.ctx.service.main.talentList();
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async talentAdd() {
    const { profession_id, talent_name } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('TalentInfo', { profession_id, talent_name });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async talentEdit() {
    const { id, profession_id, talent_name } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('TalentInfo', id, { talent_name, profession_id });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, talent_name, profession_id }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async talentDel() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.service.main.delItem('TalentInfo', id);
    if (result) { // 返回 1 删除成功, 0 失败
      this.ctx.body = { ret: 0, data: { id }, msg: '已经删除！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '删除失败' };
    }
  }
  // monster
  async monsterList() {
    const data = await this.ctx.service.main.monsterList();
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async instanceList() {
    const list = await this.ctx.service.main.list('MonsterInfo', { instance_or_monster: 0 }, [ 'id', 'name' ]);
    this.ctx.body = { ret: 0, data: { list }, msg: 'ok' };
  }
  async monsterAdd() {
    const { profession_id, talent_name, sort } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('MonsterInfo', { profession_id, talent_name, sort });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }

  // gamer
  async gamerIndex() {
    const data = { my_team: [] };
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
}

module.exports = MainController;
