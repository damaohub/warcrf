'use strict';

const Controller = require('egg').Controller;

class LotteryController extends Controller {

  async getCount(a1, a2) {
    // console.log(a2);
    // console.log(a2);
    if (!a1 || !a2) return false;
    if (a1.length !== a2.length) return false;
    const countArr = [];
    if (Array.isArray(a1) && Array.isArray(a2)) {
      const b1 = a1.sort();
      const b2 = a2.sort();
      for (let i = 0; i < a1.length; i++) {
        if (b1[i] === b2[i]) {
          countArr.push('count');
        }
      }
    }
    return countArr.length;
  }

  async dlt() {
    const { redArr, blueArr } = this.ctx.request.body;
    const r = redArr.sort();
    const b = blueArr.sort();
    const result = await this.ctx.curl('http://www.lottery.gov.cn/api/lottery_kj_detail_new.jspx?_ltype=4&_term=', {
      method: 'POST',
      dataType: 'json',
      // 3 秒超时
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        Origin: 'http://www.lottery.gov.cn',
        Referer: 'http://www.lottery.gov.cn/dlt/index.html',
      },
    });
    const { status, data } = result;
    if (status === 200) {
      const t = data[0].codeNumber;
      const details = data[0].details;
      const tr = t.slice(0, 5);
      const tb = t.slice(5);
      const rCount = await this.getCount(r, tr);
      const bCount = await this.getCount(b, tb);
      // console.log(br);
      // console.log(!b);
      if (rCount === 5 && bCount === 2) {
        this.ctx.body = details[0];
      } else if (rCount === 5 && bCount === 1) {
        this.ctx.body = details[1];
      } else if (rCount === 5 && bCount === 0) {
        this.ctx.body = details[2];
      } else if (rCount === 4 && bCount === 2) {
        this.ctx.body = details[3];
      } else if (rCount === 4 && bCount === 1) {
        this.ctx.body = details[4];
      } else if (rCount === 3 && bCount === 2) {
        this.ctx.body = details[5];
      } else if (rCount === 4 && bCount === 0) {
        this.ctx.body = details[6];
      } else if (rCount === 3 && bCount === 1) {
        this.ctx.body = details[7];
      } else if (rCount === 2 && bCount === 2) {
        this.ctx.body = details[7];
      } else if (rCount === 3 && bCount === 0) {
        this.ctx.body = details[8];
      } else if (rCount === 1 && bCount === 2) {
        this.ctx.body = details[8];
      } else if (rCount === 2 && bCount === 1) {
        this.ctx.body = details[8];
      } else if (rCount === 0 && bCount === 2) {
        this.ctx.body = details[8];
      } else {
        // this.ctx.body = {
        //   allmoney: '0',
        //   level: '未中奖',
        // };
        this.ctx.body = data;
      }
    }
  }
}

module.exports = LotteryController;
