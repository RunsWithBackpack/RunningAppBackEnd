'use strict'

const dbIndex = require('../../db');
const db=dbIndex.db;
const Route = dbIndex.Route;
const Routetime = dbIndex.Routetime;
const User = dbIndex.User;

module.exports = require('express').Router()
  .get('/',//THIS SHOULD BE FORBIDDEN TO REGULAR USERS!!!!!!!!!!!  ONLY ADMIN OR SOMETHING CAN GET THIS... IMPLEMENT THIS WHEN WE HAVE TIME
    (req, res, next) => {// an example of a query: http://localhost:3000/api/runroutes/?latitude=35&longitude=-119&latitudeDelta=3&longitudeDelta=1000&limit=10 (for the seedfile, this should return one of the two routes)
      let limit= (!req.query.limit) ? 2 : req.query.limit;//default limit if none was specified
      // console.log(limit)
      if(req.query.latitude && req.query.longitude && req.query.latitudeDelta && req.query.longitudeDelta){
        let region={ latitude: +req.query.latitude, longitude: +req.query.longitude, latitudeDelta: +req.query.latitudeDelta, longitudeDelta: +req.query.longitudeDelta, }
        // console.log(region)
        return Route.filterRoutesByRegion(region, limit)
                .then(filteredRoutes=> {
                  // console.log('num routes to display : ', filteredRoutes.length)
                  return res.json(filteredRoutes)
                })
                .catch(next)
      }
      else {
        return Route.findAll({limit: limit, order: 'popularity DESC' })
        .then(allRoutes => {
          // console.log('num routes found : ',allRoutes.length)
          return res.json(allRoutes)
        })
        .catch(next)
      }
    })
  .get('/:id',
  (req, res, next) =>
    Route.findOne(
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
    .post('/',//should look something like: {"userId": "1","timesArr": ["1","2"], "convCoords": [{"latitude": "1","longitude": "1"},{"latitude": "1","longitude": "1"}] }
    //or {"userId": "1","timesArr": ["1","2"], "convCoords": [{"latitude": "1","longitude": "1"},{"latitude": "1","longitude": "1"}], "routeId": "1" }  if adding just routetime
      (req, res, next) =>{
        // req.body.routeId= "1" (this is optional.. if not included, it means you are just creating routetime, and NOT a route)
        // req.body.convCoords=[{'latitude': '15', 'longitude': '20'},{'latitude': '20', 'longitude': '25'}];
        // req.body.startTime=Date.now();
        // req.body.startTime=Date.now();
        // req.body.userId=1;
        // req.body.timesArr=[1,2];
        // the above is for testing purposes

        let routeinstance, routeId;

        return Route.findOrCreate({where: {id: req.body.routeId }})
          .then(createdRouteArr => {
            routeinstance= createdRouteArr[0];
            routeinstance.jsonLatLongCoords=req.body.convCoords;
            routeId = routeinstance.id;
            return User.findById(req.body.userId)
          .then(user=>{
            return user.addRoute(routeinstance);
          })
          .then(()=>{
            return Routetime.create({timesArr: req.body.timesArr, startTime: req.body.startTime, endTime: req.body.endTime , userId: req.body.userId, routeId});
          })
          .then(Routetime=>{
            res.json(Routetime);
          })
          .catch(next)
        })
      })
