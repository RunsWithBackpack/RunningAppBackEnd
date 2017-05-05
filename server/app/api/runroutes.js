'use strict'

const dbIndex = require('../../db');
const db=dbIndex.db;
const Route = dbIndex.Route;

module.exports = require('express').Router()
  .get('/',//THIS SHOULD BE FORBIDDEN TO REGULAR USERS!!!!!!!!!!!  ONLY ADMIN OR SOMETHING CAN GET THIS... IMPLEMENT THIS WHEN WE HAVE TIME
    (req, res, next) =>
      Route.findAll()
        .then(allRoutes => res.json(allRoutes))
        .catch(next))
  .get('/:id',
  (req, res, next) =>
    Route.findAll(
      {
        where: {id: req.params.id},
        include: [{model: db.model('user'), as: 'users',
          include: [{ model: db.model('routetime'), as: 'routetimes', where: { best: true, routeId: req.params.id }}]
          }]
      })
      .then(routes=>{
        console.log(routes)
        return routes;
      })
      .then(routes => res.json(routes))
      .catch(next))
  // .post('/login', function (req, res, next) {
  //   User.findOne({where: {email: req.body.email, password: req.body.password}})
  //     .then(userObj=>{
  //       if(userObj){
  //         res.status(200).send(userObj);
  //       }
  //       else{
  //         res.status(401).send('Not found!!!!');
  //       }
  //     })
  //     .catch(next)
  // })
  // .post('/signup', function(req, res, next){
  //   User.findOrCreate({where: {email: req.body.email, password: req.body.password}})
  //     .then(userObj=>{
  //       // if(userObj){
  //         res.status(200).send(userObj);
  //       // }
  //       // else{
  //       //   res.status(401).send('Not found!!!!');
  //       // }
  //     })
  //     .catch(next)
  // })
