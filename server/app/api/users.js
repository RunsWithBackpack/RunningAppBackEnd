'use strict'

const express = require('express');
const router = express.Router();
const session = require('express-session');
const dbIndex = require('../../db');
// const db = require('../../db/db.js')
const User = dbIndex.User;
const db=dbIndex.db;
const Route = dbIndex.Route;
const Routetime = dbIndex.Routetime;

// const {mustBeLoggedIn, forbidden} = require('./auth.filters')  //have not implemented this yet (maybe much much later)


// module.exports = require('express').Router()


router.use(session({
  secret: 'phantomRacer', 
  resave: false,
  saveUninitialized: false
  }));


 router.use(function (req, res, next) {
    console.log('session!!', req.session);
     next();
  });

  router.get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'), //Have not implemented this just yet...
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))

//This is the route for getting all the routes/routetimes that a user has run
  router.get('/:id', (req, res, next)=> {
    // console.log('SESSION ', req.session.user)
    return User.findOne({
        where: {id: req.params.id},
          include: [{model: Route, through: 'UserAndRoutes', as: 'routes', 
          include: [{ model: Routetime, as: 'routetimes', where: {userId: req.params.id}}],
          }]
      })
      .then(userStats => {
        res.json(userStats)
      })
      .catch((next))

  })

module.exports = router
