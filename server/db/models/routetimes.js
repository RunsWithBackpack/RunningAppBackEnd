const millisToMinutesAndSeconds = require('../../utils').millisToMinutesAndSeconds;

const Sequelize = require('sequelize');
const db = require('../db');

var Routetime = db.define('routetime',
  {
    timesArr: {
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
    }
  },
  {
    getterMethods : {
      convTimesArr: function(){//On the front end, you can get the array of times in minutes and seconds that look better for display (rather than milliseconds) via this pseudofield convTimesArr
        console.log(this.timesArr);
        let convertedTimesArr= this.timesArr.map(time_in_millisecs=>{
          return millisToMinutesAndSeconds(time_in_millisecs);
        })
        return convertedTimesArr;
      },
      runtime: function(){
        return this.timesArr[this.timesArr.length-1]-this.timesArr[0];
      },
    },
    hooks: {
      afterCreate: function(newroutetime) {//this hook ensures that a players routetimes (for a given route) are updated with the correct boolean for the "best" field after a new routetime is created (for that route and player)
        console.log('test')
        userId= newroutetime.userId;
        routeId= newroutetime.routeId;
        return Routetime.update({best: false},{where: {userId, routeId}, returning: true})//not sure why i may need return, but im doing it anyway... also, remember you NEED returning: true, if you want the second element of the resolved value (updatedRes) to contain the updated rows
          .then((updatedRes)=>{
            let numaffectedRows= updatedRes[0];//just for future reference
            let affectedRows= updatedRes[1];//affectedRows are the updated routetimes (associated with a user and route)
            return affectedRows.sort(function(a,b){return b.runtime-a.runtime})[0].update({best: true});//this sets the best routetime for a particular user and route to have "true" value for its field "best"
          })
      },
    }
  }
);

module.exports= Routetime;
