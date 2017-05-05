const Sequelize = require('sequelize');
const db = require('../db');


var Route = db.define('route',

  {
    coords: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.DECIMAL)),//Should look something like [[36.5, -120],[36.4,-120]] where first el is lat, second el is long
        // allowNull: false,
        // defaultValue: [],
    },
  },
  {
    getterMethods   : {
      convCoords: function() {//On the front end, you can get the array of coordinates that can work with navigator and mapview via this pseudofield convCoords
        // console.log(this.coords);
        let convertedCoords= this.coords.map(arr=>{
          return {latitude: arr[0], longitude: arr[1]};//so the above example coords would look like [{latitude: 36.5, longitude: -120},{latitute: 36.4, longitude: -120}]
        })
        return convertedCoords;
      },
    },

    // setterMethods   : { //HOW THE FUCK DO SETTERS WORK??? WHY NOT JUST MAKE AN INSTANCE METHOD???? FIGURE THIS SHIT OUT
    //   fullName       : function(value) {
    //       var names = value.split(' ');
    //
    //       this.setDataValue('firstname', names.slice(0, -1).join(' '));
    //       this.setDataValue('lastname', names.slice(-1).join(' '));
    //   },
  }//WHY DO TRAILING COMMAS NOT WORK HERE?!?!? THIS IS FUCKING STPUID
);



module.exports = Route;
