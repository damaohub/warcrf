'use strict';

const Controller = require('egg').Controller;

class LotteryController extends Controller {

  async getCount(a1, a2) {
    if (!a1 || !a2) return false;
    if (a1.length < a2.length) return false;
    const countArr = [];
    if (Array.isArray(a1) && Array.isArray(a2)) {
      const arr = a1.concat(a2);
      arr.sort((a, b) => (a - b));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
          countArr.push(arr[i]);
        }
      }
    }
    return countArr.length;
  }

  async getDlt(term) {
    const t = term ? term : '';
    const result = await this.ctx.curl(`http://www.lottery.gov.cn/api/lottery_kj_detail_new.jspx?_ltype=4&_term=${t}`, {
      method: 'POST',
      dataType: 'json',
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        Origin: 'http://www.lottery.gov.cn',
        Referer: 'http://www.lottery.gov.cn/dlt/index.html',
      },
    });
    return result;
  }

  async checkDlt() {
    const { redArr, blueArr, term } = this.ctx.request.body;
    if (!redArr || !blueArr || !term) {
      this.ctx.response.status = 400;
      this.ctx.body = { message: '请求参数错误' };
      return;
    }
    const r = redArr.sort();
    const b = blueArr.sort();
    const result = await this.getDlt(term);
    const { status, data } = result;
    if (status === 200) {
      const lottery = data[0].lottery;
      const t = data[0].codeNumber;
      const details = data[0].details;
      const tr = t.slice(0, 5);
      const tb = t.slice(5);
      const rCount = await this.getCount(r, tr);
      const bCount = await this.getCount(b, tb);
      if (details === null) {
        this.ctx.body = {
          type: -1,
          level: '尚未开奖',
          lottery,
        };
      } else if (rCount === 5 && bCount === 2) {
        this.ctx.body = Object.assign(details[0], { type: 1 }, { lottery });
      } else if (rCount === 5 && bCount === 1) {
        this.ctx.body = Object.assign(details[1], { type: 2 }, { lottery });
      } else if (rCount === 5 && bCount === 0) {
        this.ctx.body = Object.assign(details[2], { type: 3 }, { lottery });
      } else if (rCount === 4 && bCount === 2) {
        this.ctx.body = Object.assign(details[3], { type: 4 }, { lottery });
      } else if (rCount === 4 && bCount === 1) {
        this.ctx.body = Object.assign(details[4], { type: 5 }, { lottery });
      } else if (rCount === 3 && bCount === 2) {
        this.ctx.body = Object.assign(details[5], { type: 6 }, { lottery });
      } else if (rCount === 4 && bCount === 0) {
        this.ctx.body = Object.assign(details[6], { type: 7 }, { lottery });
      } else if (rCount === 3 && bCount === 1) {
        this.ctx.body = Object.assign(details[7], { type: 8 }, { lottery });
      } else if (rCount === 2 && bCount === 2) {
        this.ctx.body = Object.assign(details[7], { type: 8 }, { lottery });
      } else if (rCount === 3 && bCount === 0) {
        this.ctx.body = Object.assign(details[8], { type: 9 }, { lottery });
      } else if (rCount === 1 && bCount === 2) {
        this.ctx.body = Object.assign(details[8], { type: 9 }, { lottery });
      } else if (rCount === 2 && bCount === 1) {
        this.ctx.body = Object.assign(details[8], { type: 9 }, { lottery });
      } else if (rCount === 0 && bCount === 2) {
        this.ctx.body = Object.assign(details[8], { type: 9 }, { lottery });
      } else if (rCount === false || bCount === false) {
        this.ctx.body = {
          allmoney: undefined,
          level: '验证出错',
          lottery,
        };
      } else {
        this.ctx.body = {
          type: 0,
          allmoney: 0,
          level: '未中奖',
          lottery,
        };
      }
    }
  }

  async dlt() {
    const result = await this.getDlt();
    this.ctx.body = { dlt: result.data[0] };
  }

  async test() {
    const { redArr, blueArr, term } = this.ctx.request.body;
    console.log(this.ctx.request.body);
    if (!redArr || !blueArr || !term) {
      this.ctx.response.status = 400;
      this.ctx.body = { message: '请求参数错误' };
      return;
    }
    const result = await this.getDlt(term);
    this.ctx.body = result;
  }
}

module.exports = LotteryController;
