/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-09-02 12:48:28
 * @FilePath: \myexpress\myexpress\router.js
 * @Description: add some description
 */
const http = require('http');
const createLayer = require('./layer');

class Router {
  constructor() {
    this.routes = [];
    this.useMethods();
  }

  // 挂载 http methods
  useMethods() {
    http.METHODS.forEach(method => {
      method = method.toLocaleLowerCase();
      this[method] = (path, fn) => {
        this.routes.push(createLayer(method, path, fn));
      }
    })
  }
}

const createRouter = () => {
  return new Router();
}

module.exports = createRouter;