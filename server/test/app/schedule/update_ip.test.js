'use strict';


const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/schedule/update_ip.test.js', () => {
  it('should schedule work fine', async () => {
    await app.ready();
    await app.runSchedule('update_ip');
    assert(app.ip);
  });
});
