/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-09-02 10:04:02
 * @FilePath: \myexpress\myexpress\layer.js
 * @Description: add some description
 */
const createLayer = (m, p, f) => {
  return {
    method: m,
    path: p,
    fn: f
  };
}

module.exports = createLayer;