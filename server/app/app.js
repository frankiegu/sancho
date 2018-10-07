'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    // worker 进程被 fork 的话，会执行这段代码
  });
};
