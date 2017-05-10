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
      type: Sequelize.DATE,
    },
    endTime: {
      type: Sequelize.DATE,
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
    }
  },
  {
    getterMethods : {
      runtime: function(){
        return this.personalTimeMarker[this.personalTimeMarker.length-1]-this.personalTimeMarker[0];
      },
    },
      setterMethods : {
      jsonLatLongCoords: function(jsonLatLongArr){
        // console.log('this is the jsonLatLongArr', jsonLatLongArr)
        let latlongArrArr= jsonLatLongArr.map(latlongObj=>{
          return [+latlongObj.latitude,+latlongObj.longitude]
        })
        this.setDataValue('personalCoords',latlongArrArr);
        this.save();
      }
    },
    hooks: {
      afterCreate: function(newroutetime) {
        //this hook ensures 2 things:
        //1: that a players routetimes (for a given route) are updated with the correct boolean for the "best" field after a new routetime is created (for that route and player)
        //2: that the associated route for the newly created routetime has its popularity field updated (incremented by 1)

        userId= newroutetime.userId;
        routeId= newroutetime.routeId;

        let upRoutetimeBestProm=
        Routetime.update({best: false},{where: {userId, routeId}, returning: true})//not sure why i may need return, but im doing it anyway... also, remember you NEED returning: true, if you want the second element of the resolved value (updatedRes) to contain the updated rows
          .then((updatedRes)=>{
            let numaffectedRows= updatedRes[0];//just for future reference
            let affectedRows= updatedRes[1];//affectedRows are the updated routetimes (associated with a user and route)
            return affectedRows.sort(function(a,b){return b.runtime-a.runtime})[0].update({best: true});//this sets the best routetime for a particular user and route to have "true" value for its field "best"
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
