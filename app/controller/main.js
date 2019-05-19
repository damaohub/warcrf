'use strict';
const Controller = require('egg').Controller;
class MainController extends Controller {

  // data中天赋id列表化成对象数组添加进data
  async assinTalents(data, col) {
    const talentsData = await this.ctx.service.main.list('TalentInfo');
    const talentsMap = {};
    talentsData.map(item => (
      talentsMap[item.id] = item.talent_name
    ));
    data.list.map(item => {
      const ids = item[col].split(',');
      ids.shift();
      ids.pop();
      const talents = [];
      ids.map(id => talents.push(talentsMap[id]));
      item.talents = talents;
      return item;
    });
    return data;
  }
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
  async instanceMonsters() {
    const { instance_id } = this.ctx.request.body;
    const list = await this.ctx.service.main.list('MonsterInfo', { instance_id });
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
    const result = await this.ctx.service.main.equipList();
    const data = await this.assinTalents(result, 'talent_ids');
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async equipAdd() {
    const { equip_name, equip_location, equip_type, talent_ids, monster_id } = this.ctx.request.body;
    // const talentIds = talent_ids.join(',');
    const data = await this.ctx.service.main.addItem('EquipInfo', { equip_name, equip_location, equip_type, talent_ids, monster_id }, true);
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async equipEdit() {
    const { id, equip_location, equip_name, equip_type, monster_id, talent_ids } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('EquipInfo', id, { id, equip_location, equip_name, equip_type, monster_id, talent_ids }, true);
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, equip_location, equip_name, equip_type, monster_id, talent_ids }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async equipDel() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.service.main.delItem('EquipInfo', id);
    if (result) { // 返回 1 删除成功, 0 失败
      this.ctx.body = { ret: 0, data: { id }, msg: '已经删除！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '删除失败' };
    }
  }
  // rule
  async ruleList() {
    const sourceList = await this.ctx.service.main.list('RuleInfo');
    const list = this.ctx.helper.listToTree(sourceList, { parentKey: 'pid' });
    this.ctx.body = { ret: 0, data: { list }, msg: 'ok' };
  }
  async ruleAdd() {
    const { rule_name, rule_api, pid, sort } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('RuleInfo', { rule_name, rule_api, pid, sort, is_api: 1 });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async ruleEdit() {
    const { id, rule_name, rule_api, pid, sort } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('RuleInfo', id, { id, rule_name, rule_api, pid, sort, is_api: 1 });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, rule_name, rule_api, pid, sort }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async ruleAddGroup() {
    const { rule_name, sort } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('RuleInfo', { rule_name, rule_api: 0, pid: 0, sort, is_api: 0 });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async ruleEditGroup() {
    const { id, rule_name, sort } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('RuleInfo', id, { id, rule_name, rule_api: 0, pid: 0, sort, is_api: 0 });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, rule_name, pid: 0, sort }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  // role
  async roleList() {
    const list = await this.ctx.service.main.list('RoleInfo');
    this.ctx.body = { ret: 0, data: { list }, msg: 'ok' };
  }
  async roleEdit() {
    const { id, role_name, role_description } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('RoleInfo', id, { id, role_name, role_description });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, role_name, role_description }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async roleAdd() {
    const { role_name, role_description } = this.ctx.request.body;
    const data = await this.ctx.service.main.addItem('RoleInfo', { role_name, role_description });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async roleEditRule() {
    const { id, role_rule } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('RoleInfo', id, { id, role_rule });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id, role_rule }, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  // order
  async orderList() {
    const data = await this.ctx.service.main.orderList();
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async orderInfo() {
    const data = await this.ctx.service.main.orderInfo();
    const plainData = data.get({ plain: true });
    const talentsData = await this.ctx.service.main.list('TalentInfo');
    const talentsMap = {};
    talentsData.map(item => (
      talentsMap[item.id] = item.talent_name
    ));
    const ids = plainData.account.talent_id.split(',');
    ids.shift();
    ids.pop();
    const talents = [];
    ids.map(id => talents.push(talentsMap[id]));
    const profession = await this.ctx.model.ProfessionInfo.findByPk(plainData.account.profession_id);
    const professionName = profession.get({ plain: true }).profession_name;
    plainData.account.talent = talents;
    plainData.account.profession_name = professionName;
    this.ctx.body = { ret: 0, data: plainData, msg: 'ok' };
  }
  async orderAdd() {
    const { account, proj } = this.ctx.request.body;
    const authToken = this.ctx.header.authorization.substring(7); // 获取header里的authorization
    const user = this.ctx.helper.verifyToken(authToken);
    const talentsData = await this.ctx.service.main.list('TalentInfo', { id: account.talent_id }, [ 'battle_site' ]);
    const sites = [];
    for (let i = 0, len = talentsData.length; i < len; i++) {
      sites.push(talentsData[i].battle_site);
    }
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const aInfo = await this.ctx.service.main.addItem('AccountInfo', Object.assign(account, {
        account_phone: account.phone,
        account_remark: account.remark,
        type: 1,
        battle_site: sites,
        unique123: [ 'account_name', 'child_name', 'game_role_name' ],
      }), true, transaction);
      const order = await this.ctx.service.main.addItem('OrderInfo', {
        aid: aInfo[0].id,
        phone: account.phone,
        remark: account.remark,
        uid: user.id,
        status: 1,
        order_type: 1,
      }, true, transaction);
      const items = [];
      for (let i = 0, len = proj.length; i < len; i++) {
        const item = proj[i];
        if (parseInt(item.instance_or_secret) === 2 && item.difficult === 'm') {
          if (item.monster_id) {
            item.monster_id.sort();
            // 判断是否连续
            const result = item.monster_id.sort().every((elem, index, arr) => {
              if (index === (arr.length - 1)) {
                return parseInt(elem, 10) - parseInt(arr[index - 1], 10) === 1;
              }
              return parseInt(arr[index + 1], 10) - parseInt(elem, 10) === 1;
            });
            if (item.monster_id.length > 1 && !result) {
              transaction.rollback();
              this.ctx.body = { ret: 1111, msg: '副本Boss必须连续选择' };
            }
            // 分割数组
            item.monster_id.join(',');
          } else {
            transaction.rollback();
            this.ctx.body = { ret: 1111, msg: '请选择要完成的副本Boss' };
          }
        } else {
          item.monster_id = '';
        }
        items.push(Object.assign({
          oid: order[0].id,
          aid: aInfo[0].id,
          finish_num: 0,
          week_used: 0,
          status: 0 }, item));
      }
      await this.ctx.model.OrderItems.bulkCreate(items, transaction);
      await transaction.commit();

    } catch (e) {
      await transaction.rollback();
      console.log(e);
    }
  }
  // account
  async accountList() {
    const data = await this.ctx.service.main.accountList();
    const talentsData = await this.ctx.service.main.list('TalentInfo');
    const talentsMap = {};
    talentsData.map(item => (
      talentsMap[item.id] = item.talent_name
    ));
    data.list.map(item => {
      const ids = item.talent_id.split(',');
      ids.shift();
      ids.pop();
      const talents = [];
      ids.map(id => talents.push({ id, talent_name: talentsMap[id] }));
      item.talents = talents;
      item.need_talent_name = talentsMap[item.need_talent_id];
      return item;
    });

    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async accountEdit() {
    const { id } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.editItem('AccountInfo', id, this.ctx.request.body, true);
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: this.ctx.request.body, msg: '修改成功！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '更新失败' };
    }
  }
  async accountAdd() {
    const { talent_id } = this.ctx.request.body;
    const paramas = this.ctx.request.body;
    delete paramas.token;
    delete paramas.time;
    delete paramas.sign;
    const talentsData = await this.ctx.service.main.list('TalentInfo', { id: talent_id }, [ 'battle_site' ]);
    const sites = [];
    for (let i = 0, len = talentsData.length; i < len; i++) {
      sites.push(talentsData[i].battle_site);
    }
    const data = await this.ctx.service.main.addItem('AccountInfo', Object.assign(paramas, { battle_site: sites, unique123: 'account_name' }), true);
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: '您新增的数据已存在' };
    }
  }
  async accountDel() {
    const { id } = this.ctx.request.body;
    const result = await this.ctx.service.main.delItem('AccountInfo', id);
    if (result) { // 返回 1 删除成功, 0 失败
      this.ctx.body = { ret: 0, data: { id }, msg: '已经删除！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '删除失败' };
    }
  }
  // gamer
  async gamerIndex() {
    const data = { my_team: [] };
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  // ident
  async ident() {
    const { content } = this.ctx.request.body;
    const content1 = content.split(/[\n]/);
    const contentMap = {};
    content1.map(elem => {
      const input = elem.trim();
      let inputArr = input.split(':');
      if (inputArr.length < 2) {
        inputArr = input.split('：');
      }
      contentMap[inputArr[0]] = inputArr[1];
      return elem;
    });
    
    this.ctx.body = { ret: 0, data: { contentMap }, msg: 'ok' };
  }
}

module.exports = MainController;
