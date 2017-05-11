const geolib = require('geolib');
const Sequelize = require('sequelize');
const db = require('../db');


var Route = db.define('route',

  {
    coords: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.DECIMAL)),//Should look something like [[36.5, -120],[36.4,-120]] where first el is lat, second el is long
        allowNull: false,
        defaultValue: [],
    },
    popularity: {
      type: Sequelize.INTEGER,//see popularity comments.. we want to get rid of this eventually... but for now this we have no choice
      defaultValue: 0,
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
      totalDist: function(){
        return (geolib.getPathLength(this.convCoords) * 0.000621371).toFixed(2);
      },
      checkpointCoords: function(){
        return this.coords.filter(coordPair => {
          if(this.coords.indexOf(coordPair) % 5 === 0) return true
          else if(this.coords.indexOf(coordPair) === this.coords.length-1) return true
        })
      }
      // popularity: function(){    //unfortunatley this returns a promise, and not the length itself... this can be implemented again if we find a way around this.. but for now, popularity will be a direct field of route, updated by routetimes aftercreate hook
      //   return this.getRoutetimes()
      //           .then(associatedRoutetimes=>{
      //             return associatedRoutetimes.length
      //           })
      //           .catch(console.error)
      // }
    },
    setterMethods : {
      jsonLatLongCoords: function(jsonLatLongArr){
        console.log('this is the jsonLatLongArr', jsonLatLongArr)
        let latlongArrArr= jsonLatLongArr.map(latlongObj=>{
          return [+latlongObj.latitude,+latlongObj.longitude]
        })
        this.setDataValue('coords',latlongArrArr);
        this.save();
      }
    },
    classMethods : {
      filterRoutesByRegion: function(region, limit){
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

              // return  (
              //     (route.coords[0][0] <= latMax && route.coords[0][0] >= latMin) && (route.coords[0][1] <= longMax && route.coords[0][1] >= longMin) &&
              //     (route.coords[route.coords.length-1][0] <= latMax && route.coords[route.coords.length-1][0] >= latMin) && (route.coords[route.coords.length-1][1] <= longMax && route.coords[route.coords.length-1][1] >= longMin)
              //         )

              let coords=route.coords
              coords.forEach(coordPair=>{
                //if ANY coordPair in a set of coordinates for a route happens to fall within the region boundaries, the route will will be returned!

                if (
                  (coordPair[0] <= latMax && coordPair[0] >= latMin) && (coordPair[1] <= longMax && coordPair[1] >= longMin)
                )
                { return true }

              })

            })
          })
          .then(filteredRoutesByRegion=>{
            return filteredRoutesByRegion.sort(function(a,b){return b.popularity-a.popularity}).slice(0,limit);
          })
          .catch(err=>err);
      }
    },
    instanceMethods: {
      refreshPopularityVals: function(){//this method is not necessary for the most part, since routetime hooks update the popularity field for this model.  However, if the route popularity should ever become desynced from associated routetimes (for whtaever reason), you can run this to sync them up
        let popularity=0;
        return this.getRoutetimes()
          .then(associatedRoutetimes=>{
            for(let routetime of associatedRoutetimes){
              popularity+=1;
            }
            this.setDataValue('popularity',popularity);
            this.save();
            return this;
          })
          .catch(err=>err)
      }
    }
  }
);



module.exports = Route;
