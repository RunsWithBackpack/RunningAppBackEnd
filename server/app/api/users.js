'use strict'

const dbIndex = require('../../db');
// const db = require('../../db/db.js')
const User = dbIndex.User;

// const {mustBeLoggedIn, forbidden} = require('./auth.filters')  //have not implemented this yet (maybe much much later)

module.exports = require('express').Router()
  .get('/',
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
  .post('/login', function (req, res, next) {
    User.findOne({where: {email: req.body.email, password: req.body.password}})
      .then(userObj=>{
        if(userObj){
          res.status(200).send(userObj);
        }
        else{
          res.status(401).send('Not found!!!!');
        }
      })
      .catch(next)
  })
  .post('/signup', function(req, res, next){
    User.findOrCreate({where: {email: req.body.email, password: req.body.password}})
      .then(userObj=>{
        // if(userObj){
          res.status(200).send(userObj);
        // }
        // else{
        //   res.status(401).send('Not found!!!!');
        // }
      })
      .catch(next)
  })
  // .get('/fetchSession',(req,res,next)=>{
  //   res.json(req.session);
  // })
  // .post('/', function (req, res, next) {
  //   User.create(req.body)
  //   .then(user => {
  //     if (!user) {
  //       res.sendStatus(401)
  //     } else {
  //       req.session.user = user
  //       res.json(user)
  //     }
  //   })
  //   .catch(next)
  // })
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))
