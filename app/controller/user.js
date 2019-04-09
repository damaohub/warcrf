'use strict';
const fs = require('fs');
const path = require('path');
const pump = require('pump');
const Controller = require('egg').Controller;
class UserController extends Controller {
  async userInfoByToken() {
    const { ctx } = this;
    const params = ctx.helper.verifyToken(ctx.request.body.token);
    const data = await ctx.service.user.dataById(params.id);
    ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async userInfo() {
    const { id } = this.ctx.request.body;
    const data = await this.ctx.service.user.dataById(id);
    this.ctx.body = { ret: 0, data, msg: 'ok' };
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
  async perfectData() {
    const { id, real_name, id_card, basic_salary, qq, entry_time, card_img_front, card_img_behind } = this.ctx.request.body;
    const data1 = await this.ctx.service.main.addItem('UserData', { uid: id, real_name, id_card, basic_salary, qq, entry_time, card_img_front, card_img_behind });
    if (data1[0]) {
      this.ctx.body = { ret: 0, data: { id }, msg: '已提交！' };
    } else {
      this.ctx.body = { ret: 1002, msg: '资料添加失败' };
    }
  }
  async uploadCardimg() {
    const { ctx } = this;
    // 获取 steam
    const stream = await ctx.getFileStream();
    // 生成文件名
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
    // 写入路径
    const target = path.join(this.config.baseDir, 'app/public/upload/', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = { ret: 0, data: 'http://localhost:7001/public/upload/' + filename, msg: '上传完成' };
  }
  async salary() {
    const data = await this.ctx.service.user.salaryList();
    const salary = await this.ctx.service.user.salary();
    Object.assign(data, { current_month_money: salary.money });
    this.ctx.body = { ret: 0, data, msg: 'ok' };
  }
  async rewardPunishment() {
    const { id, type, money, reason, token } = this.ctx.request.body;
    const params = this.ctx.helper.verifyToken(token);
    const user = await this.ctx.service.user.infoById(params.id);
    const data = await this.ctx.service.main.addItem('SalaryLog', { uid: id, type, money, reason, exec_id: user.id });
    if (data[1]) {
      this.ctx.body = { ret: 0, data: data[0], msg: '新增成功！' };
    } else {
      this.ctx.body = { ret: 3002, data: data[0], msg: `您输入的手机号“${data[0].username}”已存在` };
    }
  }
}
module.exports = UserController;
