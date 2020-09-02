/*
 * @LastEditors: panda_liu
 * @LastEditTime: 2020-09-02 12:48:07
 * @FilePath: \myexpress\index.js
 * @Description: add some description
 */
const express = require('./myexpress');

const app = express();
const router = app.Router();


app.use((req, res, next) => {
  console.log('ppanda');
  next();
})

app.get('/panda', (req, res) => {
  res.end('this is mrpanda');
})

router.get('/bear', (req, res) => {
  res.end('this is bear');
})

app.post('/cat', (req, res) => {
  res.end('this is cat');
})

app.listen(3000, () => {
  console.log('running...');
});