'use strict';

const wechat = require('co-wechat');
const Controller = require('egg').Controller;

module.exports = app => {
  const { token, appid, encodingAESKey } = app.config.wechat;
  class WechatController extends Controller { }
  WechatController.prototype.wechat = wechat({
    token, appid, encodingAESKey,
  }).middleware(async (message, ctx) => {
    // TODO
    app.logger.info(`message:${JSON.stringify(message)};ctx:${ctx}`);
    return { type: 'text', content: 'Hello world!' };
  });
  return WechatController;
};
