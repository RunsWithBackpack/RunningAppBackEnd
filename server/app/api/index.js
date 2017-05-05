

'use strict'

const api = module.exports = require('express').Router()

// console.log(module.exports)

api
  // .get('/heartbeat', (req, res) => res.send({ok: true}))
  // .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/runroutes', require('./runroutes'))
  // .use('/categories', require('./categories'))
  // .use('/products', require('./products'))
  // .use('/orders', require('./orders'))
  // .use('/prodOnOrders', require('./prodOnOrders'))
  // .use('/reviews/', require('./reviews'))
  // .use('/sendEmail', require('./sendEmail'))

// No routes matched? 404
api.use((req, res) => res.status(404).end())





// 'use strict';
// /* eslint-disable new-cap */
// const express=require('express');
// const app=express();
// const router = express.Router();//whats the different again between app.use and router.use?? ask
// module.exports = router;
//
// console.log(require('./api'))
//
// console.log(';laksjdf;lkasdjf')
// router.use('/api', require('./api'))
//
//
// // Make sure this is after all of
// // the registered routes!
// router.use(function (req, res) {
//   res.status(404).end();
// });
