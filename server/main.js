'use strict';

/* eslint-disable global-require */
// var socketio = require('socket.io');
var chalk = require('chalk');
var session = require('express-session');

// var store = require('./store').store;//Uncomment this when we decide to use sockets

var dbIndex = require('./db');
var db= dbIndex.db;
var app = require('./app');

// app.use(session({
//   secret: 'phantomRacer', 
//   resave: false,
//   saveUninitialized: false
// }));


//  app.use(function (req, res, next) {
//     console.log('session!!', req.session);
//      next();
//   });
// Serve our api - ./api also requires in ../db, which syncs with our database
// app.use('/api', require('app/api'))

var server = require('http').createServer(app);
// var io = socketio(server);

var startServer = function () {

    var PORT = process.env.PORT || 3000;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

db.sync()
.then(()=>{
  console.log('db has synced');
  startServer();
})
