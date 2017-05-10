'use strict'

const dbIndex = require('../../db');
// const db = require('../../db/db.js')
const User = dbIndex.User;
const db=dbIndex.db;
const Route = dbIndex.Route;
const Routetime = dbIndex.Routetime;

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

  .post('/login', function (req, res, next) {//when we have extra time.. try to implement REAL login with passport (and perhaps OATH too)
    // console.log('req body: ',req.body);
    return User.findOne({where: {email: req.body.email, password: req.body.password}})//note currently the email login part is CASE SENSITIVE which is very annoying (we should change this when we have the time)
      .then(userObj=>{
        // console.log('query result is ', userObj)
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
    return User.findOrCreate({where: {email: req.body.email, password: req.body.password}})
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


//This is the route for getting all the routes/routetimes that a user has run
  .get('/:id', (req, res, next)=> {
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


