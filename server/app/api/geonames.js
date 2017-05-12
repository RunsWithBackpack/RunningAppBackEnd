'use strict'
const axios=require('axios')

module.exports = require('express').Router()
  .get('/',
    (req, res, next) => {
      let latitude= req.query.latitude
      let longitude= req.query.longitude
      return axios.get(`http://api.geonames.org/findNearestIntersectionJSON?lat=${latitude}&lng=${longitude}&username=demo`)
        .then(res=>{
          return res.data.intersection})
        .then(intersection=>{
          if(intersection) res.json(intersection)
          else res.json({})
        })
        .catch(next)
      })
  .get('/bulk',
    (req, res, next) => {
      let max= (!req.query.max) ? 4 : req.query.max;//default max if none was specified
      // console.log(max)
      let latitude= req.query.latitude
      let longitude= req.query.longitude
      console.log('req.query is ', req.query)
      return axios.get(`http://api.geonames.org/findNearestIntersectionJSON?lat=${latitude}&lng=${longitude}&maxRows=${max}&username=demo`)
        .then(response=>{
          console.log('geonames response is ', response)
          let intersectionsArr= response.data.intersection
          if(intersectionsArr) res.json(intersectionsArr)
          else res.json([])
        })
        .catch(next)
      })
