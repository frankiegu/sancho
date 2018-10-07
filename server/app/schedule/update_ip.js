'use strict';

module.exports = app => {
  return {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    schedule: {
      interval: '60s', // 1 分钟间隔
      type: 'worker', // 任何一个 worker 执行，如果是 all 所有 worker 都需要执行
      disable: app.config.env !== 'production',
    },
    async task(ctx) {
      // todo update ip here
      const iPres = await ctx.app.curl('http://bwg.davidnotes.net/ip', {
        method: 'GET',
        dataType: 'text',
      });
      app.logger.info(`current ip ${iPres.data}`);
      if (iPres.status === 200 && ctx.app.ip !== iPres.data) {
        app.logger.info(`new updated ip ${iPres.data}`);
        const data = Object.assign({}, app.config.dnspod);
        data.format = 'json';
        data.value = iPres.data;
        app.logger.info(`request value ${JSON.stringify(data)}`);
        const res = await ctx.app.curl('https://dnsapi.cn/Record.Ddns', {
          method: 'POST',
          dataType: 'json',
          data,
        });
        app.logger.info(`dns response data ${JSON.stringify(res.data)}`);
        if (res.data.status.code === '1') {
          ctx.app.ip = iPres.data;
        }
      }
    },
  };
};
