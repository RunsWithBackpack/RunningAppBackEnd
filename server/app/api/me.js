const express = require('express');
const router = express.Router();
const session = require('express-session');
const dbIndex = require('../../db');
// const db = require('../../db/db.js')
const User = dbIndex.User;
const db=dbIndex.db;



router.use(session({
  secret: 'phantomRacer', 
  resave: false,
  saveUninitialized: false
  }));


 router.use(function (req, res, next) {
    console.log('session!!', req.session);
     next();
  });

 router.get('/', (req, res, next) => {
 	console.log('Session IS THIS ', req.session)
 	if (req.session.user){
 		let user = req.session.user
 		res.json(user)
 	} else {
 		res.status(500).send()
 	}
 })



 router.post('/login', function (req, res, next) {//when we have extra time.. try to implement REAL login with passport (and perhaps OATH too)
    // console.log('req body: ',req.body);
    // console.log('SESSION ', req.session)
    return User.findOne({where: {email: req.body.email, password: req.body.password}})//note currently the email login part is CASE SENSITIVE which is very annoying (we should change this when we have the time)
      .then(userObj=>{
        // console.log('query result is ', userObj)
        if(userObj){
            req.session.user = userObj
            res.status(200).send(userObj); 
        }
        else{
          res.status(401).send('Not found!!!!');
        }
      })
      .catch(next)
  })

 router.post('/signup', function(req, res, next){
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

 router.post('/logout', function(req, res, next){
    req.session.destroy()
    res.send(req.session)
  })

  module.exports = router