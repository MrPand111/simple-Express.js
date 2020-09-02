/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-09-02 19:06:35
 * @FilePath: \myexpress\index.js
 * @Description: add some description
 */
const http = require('http');
const url = require('url');
const router = require('./router');
const createLayer = require('./layer');

class App {
  // 初始化
  constructor() {
    this.router = router();
    this.use((req, res, next) => {
      const {
        pathname,
        query
      } = url.parse(req.url, true);
      const hostname = req.headers['host'].split(":")[0];
      req.path = pathname;
      req.query = query;
      req.hostname = hostname;
      next();
    })
    this.useMethods();
  }

  // server app
  app(req, res) {
    const md = req.method.toLowerCase();
    const {
      pathname
    } = url.parse(req.url, true);
    let index = 0;
    // next函数
    const next = (err) => {
      if (index === this.router.routes.length) return res.end(`Cannot ${md} ${pathname}`);
      const {
        method,
        path,
        fn
      } = this.router.routes[index++];
      // 如果错误收集中间件
      if (err) {
        if (fn.length === 4) fn(err, req, res, next);
        else next(err);
      } else {
        // 如果是中间件
        if (method === 'middleware') {
          if (path === '/' || path.indexOf(pathname) === 0) fn(req, res, next);
          else next();
        } else {
          // 如果是请求
          if ((method === md || method === 'all') && (path === pathname || path === '*')) return fn(req, res);
          else next();
        }
      }
    }
    next();
  }

  // 挂载 http methods
  useMethods() {
    http.METHODS.forEach(method => {
      method = method.toLocaleLowerCase();
      this[method] = (path, fn) => {
        this.router.routes.push(createLayer(method, path, fn));
      }
    })
  }

  all(path, fn) {
    this.router.routes.push(createLayer('all', path, fn));
  }

  // 挂载方法
  use(path, fn) {
    if (typeof fn !== 'function') {
      fn = path;
      path = '/';
    }
    this.router.routes.push(createLayer('middleware', path, fn));
  }

  Router() {
    return this.router;
  }

  // 封装监听端口
  listen(...args) {
    const server = http.createServer(this.app.bind(this));
    server.listen(...args);
  }
}

// 创建express实例
const createApplication = () => {
  const app = new App();
  return app;
}

module.exports = createApplication;