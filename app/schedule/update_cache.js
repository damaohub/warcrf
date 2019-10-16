'use strict';

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 25,30 20 * * 1,3,6',
      type: 'worker',
      immediate: true,
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe(term) {
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
    this.app.redis.set('dlt', JSON.stringify(result.data[0]));
    console.log('执行了定时任务' + new Date());
  }
}

module.exports = UpdateCache;
