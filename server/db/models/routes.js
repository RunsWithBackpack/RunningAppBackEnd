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
    getterMethods : {
      convCoords: function() {//On the front end, you can get the array of coordinates that can work with navigator and mapview via this pseudofield convCoords
        // console.log(this.coords);
        let convertedCoords= this.coords.map(arr=>{
          return {latitude: arr[0], longitude: arr[1]};//so the above example coords would look like [{latitude: 36.5, longitude: -120},{latitute: 36.4, longitude: -120}]
        })
        return convertedCoords;
      },
    },
    setterMethods : {
      jsonLatLongCoords: function(jsonLatLongArr){
        let latlongArrArr= jsonLatLongArr.map(latlongObj=>{
          return [+latlongObj.latitude,+latlongObj.longitude]
        })
        this.setDataValue('coords',latlongArrArr);
        this.save();
      }
    },
    classMethods : {
      filterRoutesByRegion: function(region){
        let centerLat=+region.latitude;
        let centerLong=+region.longitude;

        let latMax=centerLat+(region.latitudeDelta/2);//no need to put a '+' in front of region.latitudeDelta, since /2 will automatically change it to a number
        let latMin=centerLat-(region.latitudeDelta/2);
        let longMax=centerLong+(region.longitudeDelta/2);
        let longMin=centerLong-(region.longitudeDelta/2);
        // console.log('about to filter')
        return this.findAll()//NEED TO FIGURE OUT A WAY TO HAVE THE FILTER HAPPENING IN HERE WITH A WHERE.. BUT I DONT KNOW HOW TO DO A QUERY WHERE THE CONDITION INVOLVES TESTING ELEMENTS IN AN ARRAY (OF A FIELD)... FIGURE THIS OUT (BECAUSE RIGHT NOW ITS NOT OPTIMIZED)
          .then(routesArr=>{
            // console.log('finding All')
            return routesArr.filter(route=>{
              // console.log(latMin, latMax, longMin, longMax);
              // console.log('route coords is ',route.coords);
              return  (
                  (route.coords[0][0] <= latMax && route.coords[0][0] >= latMin) && (route.coords[0][1] <= longMax && route.coords[0][1] >= longMin) &&
                  (route.coords[route.coords.length-1][0] <= latMax && route.coords[route.coords.length-1][0] >= latMin) && (route.coords[route.coords.length-1][1] <= longMax && route.coords[route.coords.length-1][1] >= longMin)
                      )
            })
          })
      }
    }

    // classMethods : {
    //
    // }

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
