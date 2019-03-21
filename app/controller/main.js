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
    const list = await this.ctx.service.main.list('MonsterInfo', { instance_or_monster: 0 }, [ 'id', 'name', 'instance_type' ]);
    this.ctx.body = { ret: 0, data: { list }, msg: 'ok' };
  }
  async monsterAdd() {
    const { name, instance_id, instance_or_monster, instance_type, sort } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('MonsterInfo', { name, instance_id, instance_or_monster, instance_type, sort });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async monsterEdit() {
    const { id, name, instance_or_monster, instance_id, instance_name, instance_type, sort } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('MonsterInfo', id, { name, instance_or_monster, instance_id, instance_name, instance_type, sort });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, name, instance_name, sort }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async monsterDel() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.service.main.delItem('MonsterInfo', id);
    if (result) { // 返回 1 删除成功, 0 失败
      this.ctx.body = { ret: 0, data: { id }, msg: '已经删除！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '删除失败' };
    }
  }
  async monsterSearch() {
    const { searchValue } = this.ctx.request.body;
    const result = await this.ctx.service.main.monsterSearch(searchValue);
    this.ctx.body = { ret: 0, data: { list: result }, msg: 'ok' };
  }

  // equip
  async locationTypeList() {
    const equipLocation = [
      { id: 'tou', name: '头盔' },
      { id: 'lian', name: '项链' },
      { id:	'jian', name:	'肩膀' },
      { id: 'chen', name: '衬衣' },
      { id: 'xiong', name: '胸甲' },
      { id: 'yao', name: '腰带' },
      { id: 'tui', name: '腿部' },
      { id: 'xie', name: '鞋子' },
      { id: 'wan', name: '手腕' },
      { id: 'shou', name: '手套' },
      { id: 'zhi', name: '戒指' },
      { id: 'shi', name: '饰品' },
      { id: 'pi', name: '披风' },
      { id: 'pao', name: '战袍' },
      { id: 'wuqi', name: '武器' },
    ];
    const equipType = [
      { id: 'suo', name: '锁甲' },
      { id: 'ban', name: '板甲' },
      { id: 'pi', name: '皮甲' },
      { id: 'bu', name: '布甲' },
    ];
    const needType = [
      { id: 'tou', name: '头盔' },
      { id: 'jian', name: '肩膀' },
      { id: 'xiong', name: '胸甲' },
      { id: 'yao', name: '腰带' },
      { id: 'tui', name: '腿部' },
      { id: 'xie', name: '鞋子' },
      { id: 'wan', name: '手腕' },
      { id: 'shou', name: '手套' },
    ];
    const data = { equipLocation, equipType, needType };
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async equipList() {
    const data = await this.ctx.service.main.getList('EquipInfo');
    const ids = data.talent_ids
    const talents = await this.ctx.service.list('TalentInfo', {id: ids })
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async equipAdd() {
    const { equip_name, equip_location, equip_type, talent_ids, monster_id } = this.ctx.request.body;
    const talentIds = talent_ids.join(',');
    const data = await this.ctx.service.main.addItem('EquipInfo', { equip_name, equip_location, equip_type, talent_ids: `,${talentIds},`, monster_id });
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
