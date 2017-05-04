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
