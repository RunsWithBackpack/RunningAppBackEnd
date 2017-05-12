const millisToMinutesAndSeconds = require('../../utils').millisToMinutesAndSeconds;

const Sequelize = require('sequelize');
const db = require('../db');

var Routetime = db.define('routetime',
  {
    checkpointTimeMarker: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: [],
    },
    startTime: {
      type: Sequelize.BIGINT,
    },
    endTime: {
      type: Sequelize.BIGINT,
    },
    best: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    personalCoords: {
      type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.DECIMAL)),
      defaultValue: [],
    },
    personalTimeMarker: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    heartrateInfo : {
      type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.BIGINT))
    }
  },
  {
    getterMethods : {
      runtime: function(){
        // console.log('runtime getter method ', this.personalTimeMarker[this.personalTimeMarker.length-1]-this.personalTimeMarker[0])
        return this.personalTimeMarker[this.personalTimeMarker.length-1]-this.personalTimeMarker[0];
      },
    },
      setterMethods : {
      jsonLatLongCoords: function(jsonLatLongArr){
        // console.log('this is the jsonLatLongArr', jsonLatLongArr)
        let latlongArrArr= jsonLatLongArr.map(latlongObj=>{
          return [+latlongObj.latitude,+latlongObj.longitude]
        })
        this.setDataValue('personalCoords',latlongArrArr)
      },
      latLongArrArrStr: function(latLongArrArrStr){
        let latLongArrArrDec= latLongArrArrStr.map(latlongArr=>{
          return [+latlongArr[0],+latlongArr[1]]
        })
        this.setDataValue('personalCoords', latLongArrArrDec)
      }
    },
    hooks: {
      afterCreate: function(newroutetime) {
        console.log('THIS IS RUNNING')
        //this hook ensures 2 things:
        //1: that a players routetimes (for a given route) are updated with the correct boolean for the "best" field after a new routetime is created (for that route and player)
        //2: that the associated route for the newly created routetime has its popularity field updated (incremented by 1)

        userId= newroutetime.userId;
        routeId= newroutetime.routeId;
        console.log('user id ', userId, 'route Id', routeId)

        let upRoutetimeBestProm=
        // Routetime.update({best: false},{where: {userId, routeId}, returning: true})//not sure why i may need return, but im doing it anyway... also, remember you NEED returning: true, if you want the second element of the resolved value (updatedRes) to contain the updated rows
          // .then((updatedRes)=>{
          //   console.log('updatedRes', updatedRes)
          //   let numaffectedRows= updatedRes[0];//just for future reference
          //   let affectedRows= updatedRes[1];//affectedRows are the updated routetimes (associated with a user and route)
          //   let sortedRows = affectedRows.sort(function(a,b){return b.runtime-a.runtime})[0]//this sets the best routetime for a particular user and route to have "true" value for its field "best"
          //   sortedRows.update({best: true});
          //   console.log('sorted rows', sortedRows)
          //   return sortedRows
          // })

        Routetime.findAll({where: {userId, routeId}})
          .then((allroutetimes)=>{
            console.log('allroutetime length ',allroutetimes.length)
            return Promise.all(allroutetimes.map(routetime=>routetime.update({best: false})))
          })
          .then((updatedroutetimes)=>{
            console.log('updatedRes length', updatedroutetimes.length)
            let bestroutetime = updatedroutetimes.sort(function(a,b){return a.runtime-b.runtime})[0]//this sets the best routetime for a particular user and route to have "true" value for its field "best"
            bestroutetime.update({best: true});
            console.log('sorted rows', sortedRows)
            return bestroutetime
          })
          .catch(err=>err);

        let upRoutePopularityProm=
        newroutetime.getRoute()
          .then(associatedRoute=>{
            return associatedRoute.increment({'popularity': 1})
          })
          .catch(err=>err);

        return Promise.all([upRoutetimeBestProm, upRoutePopularityProm]);
      },
    }
  }
);

module.exports= Routetime;
