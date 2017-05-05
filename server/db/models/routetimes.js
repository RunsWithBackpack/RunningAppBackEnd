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
  }
);

module.exports= Routetime;
