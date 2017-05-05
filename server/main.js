'use strict';

/* eslint-disable global-require */
// var socketio = require('socket.io');
var chalk = require('chalk');

// var store = require('./store').store;//Uncomment this when we decide to use sockets

var dbIndex = require('./db');
var db= dbIndex.db;
var app = require('./app');

// Serve our api - ./api also requires in ../db, which syncs with our database
// app.use('/api', require('app/api'))

var server = require('http').createServer(app);
// var io = socketio(server);

var startServer = function () {

    var PORT = process.env.PORT || 3000;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

      // .then(()=>{   //testing purposes
      //   return db.model('route').findAll({
      //     where: {id: routeId},
      //     include: [{model: db.model('user'), as: 'users'}, {model: db.model('routetime'), as: 'routetimes'}]
      //   });
      // })
      // .then((route)=>{
      //   route=route[0]
      //   console.log(route.users.map(user=>user.id))
      //   console.log(route.routetimes.map(routetime=>routetime.timesArr))
      // })
      // .then(()=>{
      //   return db.model('routetime').findAll({
      //     where: {id: 1},
      //     include: [{model: db.model('user'), as: 'user', include: blah blah blah}]
      //     })
      //   })
      // .then((routetime)=>{
      //   console.log(routetime[0].user);
      // })
      // .then((associatedRoutetimes)=>{
      //   console.log(associatedRoutetimes.map(routetime=>routetime.timesArr))
      // })
      // .then(()=>{
      //   return db.model('user').findById(1)
      //   // console.log(routetimes)
      //   // console.log(routetimes.map(routetime=>routetime.timesArr))
      // })
      // .then((user)=>{
      //   return user.getBestTime(routeId)
      //   // db.model('route').findAll({
      //   //   where: {routeId},
      //   //   include: [{model: db.model('products'), as: 'associatedProduct'}, ],
      //   // })
      // })
      // .then((what)=>console.log(what))

};

db.sync({force: true})
.then(()=>{
  console.log('db has synced');
  startServer();
})



// implement the code below once you have database up
// startDb
// .then(createApplication)
// .then(startServer)
// .catch(function (err) {
//     console.error(chalk.red(err.stack));
//     process.exit(1);
// });
