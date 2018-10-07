'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.logger.info('debug info');
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
