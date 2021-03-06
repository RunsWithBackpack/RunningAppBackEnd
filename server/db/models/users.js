const Sequelize = require('sequelize');
const db = require('../db');


var User = db.define('user',
  {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    username: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
    },

  },
  {
    getterMethods: {
      // funcForBestTimeForRoute: function(){
      //   return
      //   return this.getRoutetimes()
      //           .then(routetimes=>{
      //             return routetimes.sort(function(a,b){return b.runtime-a.runtime})[0];
      //           })
      // }
    }
    // instanceMethods: {   //this is incomplete.. this gives best runtime regardless of route... which is useless
    //   getBestTime: function(routeId){
    //     // return this.getRoutetimes().sort(function(a,b){return b.runTime-a.runTime})
    //     return this.getRoutetimes()
    //             .then(routetimes=>{
    //               return routetimes.sort(function(a,b){return b.runtime-a.runtime})[0];
    //             })
    //   }
    // }
  }
);






module.exports = User
