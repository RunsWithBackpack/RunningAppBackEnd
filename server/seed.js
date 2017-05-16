var dbIndex = require('./db');
var db= dbIndex.db;
var routesJson= require('./routes.json');

let route1, route2;
let alyssaInst, gabiInst, charlesInst;

let charlesRoute=  routesJson["CharlesRoute"]
let GabisRunonCharlesRoute= routesJson["GabisRunonCharlesRoute"]


db.sync()
.then(()=>{
  console.log('db has synced. seeding');
  return Promise.all([
    db.model('user').create({email: 'Alyssa@alyssa.com', password: 1234, username: 'runswithbackpack!', city: 'Chicago',}),
    db.model('user').create({email: 'Gabi@gabi.com', password: 1234, username: 'ggabbiSUCHACOOLNAME', city: 'Chicago',}),//I know how much it means to you, so i spelled your name correctly this time
    db.model('user').create({email: 'Charles@charles.com', password: 1234, username: 'morningDragonWind', city: 'Chicago',}),
  ])
})
.then(users=>{
    alyssaInst=users[0];
    gabiInst=users[1];
    charlesInst=users[2];

    return Promise.all([
      // db.model('route').create({coords: [[37, -122],[36.5,-121],[36.25,-119.5]]}),
      // db.model('route').create({coords: [[35,-118],[35.75,-119.75],[35.5,-119.5]]}),
      // db.model('route').create({coords: [[38,-119],[37.75,-119.75],[37,-119]]}),
      // db.model('route').create({coords: [[45,-119],[43.5,-119.75],[43,-119.75],[42,-119]]}),
      // db.model('route').create({coords: [[41.799,-87.581],[41.800368, -87.581021],[41.802024, -87.580957],[41.804015, -87.581611],[41.805902, -87.583853],[41.807989, -87.586192]]}),
      // db.model('route').create({coords: [[41.809590, -87.596837],[41.809686, -87.592427],[41.808071, -87.590689],[41.805676, -87.589218],[41.802476, -87.587889],[41.801058, -87.587528],[41.801058, -87.5874],[41.801058, -87.5873],[41.801058, -87.5872],[41.801058, -87.5871],[41.801058, -87.5870],[41.801058, -87.5869],[41.801058, -87.5868],[41.801058, -87.5867],[41.801058, -87.5866],[41.801058, -87.5865],[41.801058, -87.5864],[41.801058, -87.5863],[41.801058, -87.5862],[41.801058, -87.5861],[41.801058, -87.5855]]}),
      // db.model('route').create({jsonLatLongCoords: charlesRoute["convCoords"]}),
      // db.model('route').create({coords: [[41.809690, -87.596837],[41.809686, -87.592627],[41.808071, -87.590589],[41.805676, -87.589518],[41.802476, -87.587489],[41.801058, -87.587428],[41.801058, -87.5873],[41.801058, -87.5872],[41.801058, -87.5871],[41.801058, -87.5870],[41.801058, -87.5869],[41.801058, -87.5867],[41.801058, -87.5866],[41.801058, -87.5865],[41.801058, -87.5864],[41.801058, -87.5863],[41.801058, -87.5862],[41.801058, -87.5861],[41.801058, -87.5859],[41.801058, -87.5858],[41.801058, -87.5857]]}),
      db.model('route').create({jsonLatLongCoords:[
                                { latitude: 41.948974, longitude: -87.65917 },
                                { latitude: 41.948474, longitude: -87.65917 },
                                { latitude: 41.947974, longitude: -87.65917 },
                                { latitude: 41.947474, longitude: -87.65917 },
                                { latitude: 41.946974, longitude: -87.65917 },
                                { latitude: 41.946474, longitude: -87.65917 },
                                { latitude: 41.945974, longitude: -87.65917 },
                                { latitude: 41.945474, longitude: -87.65917 },
                                { latitude: 41.944974, longitude: -87.65917 },
                                { latitude: 41.944474, longitude: -87.65917 },
                                { latitude: 41.943974, longitude: -87.65917 },
                                { latitude: 41.943474, longitude: -87.65917 },
                                { latitude: 41.942974, longitude: -87.65917 },
                                { latitude: 41.942474, longitude: -87.65917 },
                                { latitude: 41.941974, longitude: -87.65917 },
                                { latitude: 41.941474, longitude: -87.65917 },
                                { latitude: 41.940974, longitude: -87.65917 },
                                { latitude: 41.940474, longitude: -87.65917 },
                                { latitude: 41.939974, longitude: -87.65917 },
                                { latitude: 41.939474, longitude: -87.65917 },
                                { latitude: 41.938974, longitude: -87.65917 },
                                { latitude: 41.938474, longitude: -87.65917 },
                                { latitude: 41.937974, longitude: -87.65917 },
                                { latitude: 41.937474, longitude: -87.65917 },
                                { latitude: 41.936974, longitude: -87.65917 },
                                { latitude: 41.936474, longitude: -87.65917 },
                                { latitude: 41.935974, longitude: -87.65917 },
                                { latitude: 41.935474, longitude: -87.65917 },
                                { latitude: 41.934974, longitude: -87.65917 },
                                { latitude: 41.934474, longitude: -87.65917 },
                                { latitude: 41.933974, longitude: -87.65917 },
                                { latitude: 41.933474, longitude: -87.65917 },
                                { latitude: 41.932974, longitude: -87.65917 },
                                { latitude: 41.932566, longitude: -87.65917 }, 
                                { latitude: 41.932566, longitude: -87.658678 },
                                { latitude: 41.932566, longitude: -87.658178 },
                                { latitude: 41.932566, longitude: -87.657678 },
                                { latitude: 41.932566, longitude: -87.657178 },
                                { latitude: 41.932566, longitude: -87.656678 },
                                { latitude: 41.932566, longitude: -87.656178 },
                                { latitude: 41.932566, longitude: -87.655678 },
                                { latitude: 41.932566, longitude: -87.655178 },
                                { latitude: 41.932566, longitude: -87.654678 },
                                { latitude: 41.932566, longitude: -87.654178 },
                                { latitude: 41.932566, longitude: -87.653678 },
                                { latitude: 41.932566, longitude: -87.653178 },
                                { latitude: 41.932566, longitude: -87.652678 },
                                { latitude: 41.932566, longitude: -87.652178 },
                                { latitude: 41.932566, longitude: -87.651678 },
                                { latitude: 41.932566, longitude: -87.651178 },
                                { latitude: 41.932566, longitude: -87.650678 },
                                { latitude: 41.932566, longitude: -87.650178 },
                                { latitude: 41.932566, longitude: -87.649678 },
                                { latitude: 41.932566, longitude: -87.649178 },
                                { latitude: 41.932566, longitude: -87.648678 },
                                { latitude: 41.932566, longitude: -87.648178 },
                                { latitude: 41.932566, longitude: -87.647678 },
                                { latitude: 41.932566, longitude: -87.647178 },
                                { latitude: 41.932566, longitude: -87.646678 },
                                { latitude: 41.932566, longitude: -87.646178 },
                                { latitude: 41.932566, longitude: -87.645678 },
                                { latitude: 41.932566, longitude: -87.645178 },
                                { latitude: 41.932566, longitude: -87.644678 },
                                { latitude: 41.932566, longitude: -87.644178 },
                                { latitude: 41.932566, longitude: -87.643678 },
                                { latitude: 41.932566, longitude: -87.643178 },
                                { latitude: 41.932566, longitude: -87.642678 },
                                { latitude: 41.932566, longitude: -87.642178 },
                                { latitude: 41.932566, longitude: -87.641678 },
                                { latitude: 41.932566, longitude: -87.641178 },
                                { latitude: 41.932566, longitude: -87.640678 },
                                { latitude: 41.932566, longitude: -87.640178 },
                                { latitude: 41.932566, longitude: -87.639678 },
                                { latitude: 41.932566, longitude: -87.639276},
                                { latitude: 41.932566, longitude: -87.639276 },
                                { latitude: 41.932066, longitude: -87.639276 },
                                { latitude: 41.931566, longitude: -87.639276 },
                                { latitude: 41.931066, longitude: -87.639276 },
                                { latitude: 41.930566, longitude: -87.639276 },
                                { latitude: 41.930066, longitude: -87.639276 },
                                { latitude: 41.929566, longitude: -87.639276 },
                                { latitude: 41.929066, longitude: -87.639276 },
                                { latitude: 41.928566, longitude: -87.639276 },
                                { latitude: 41.928066, longitude: -87.639276 },
                                { latitude: 41.927566, longitude: -87.639276 },
                                { latitude: 41.927066, longitude: -87.639276 },
                                { latitude: 41.926566, longitude: -87.639276 },
                                { latitude: 41.926066, longitude: -87.639276 }
                                ]})
    ])
  })
.then(routes=>{
  // route1 = routes[0];
  // route2 = routes[1];
  // route3 = routes[2];
  // route4 = routes[4];
  // route5 = routes[0];
  // route6 = routes[1];
  // route7 = routes[2];
  route8=routes[0]
  // charlesInst.addRoute(route1);
  // charlesInst.addRoute(route2);
  // alyssaInst.addRoute(route1);
  // alyssaInst.addRoute(route2);
  // gabiInst.addRoute(route2);
  // charlesInst.addRoute(route3);
  // charlesInst.addRoute(route4);
  // gabiInst.addRoute(route4);
  // charlesInst.addRoute(route5)
  // charlesInst.addRoute(route7)
  // charlesInst.addRoute(route6)
  gabiInst.addRoute(route8)

  return Promise.all([
          // db.model('routetime').create({personalTimeMarker: [0,5000,10000,20000], userId: charlesInst.id, routeId: route1.id}),
          // db.model('routetime').create({personalTimeMarker: [0,7000,16000,24000], userId: alyssaInst.id, routeId: route1.id}),
          // db.model('routetime').create({personalTimeMarker: [0,7000,16000,23000], userId: alyssaInst.id, routeId: route1.id}),
          // db.model('routetime').create({personalTimeMarker: [0,8000,16000,25000], userId: gabiInst.id, routeId: route1.id}),
          //
          // db.model('routetime').create({personalTimeMarker: [0,5000,10000,20000], userId: charlesInst.id, routeId: route2.id}),
          // db.model('routetime').create({personalTimeMarker: [0,8000,16000,25000], userId: gabiInst.id, routeId: route2.id}),
          //
          // db.model('routetime').create({personalTimeMarker: [0,8000,16000,19000], userId: charlesInst.id, routeId: route3.id}),
          // db.model('routetime').create({personalTimeMarker: [0,8000,16000,17000], userId: charlesInst.id, routeId: route3.id}),
          // db.model('routetime').create({personalTimeMarker: [0,8000,16000,18000], userId: charlesInst.id, routeId: route3.id}),

          // db.model('routetime').create({personalTimeMarker: [0,10,20,30,40,50], userId: charlesInst.id, routeId: route4.id}),

          // db.model('routetime').create({personalTimeMarker: [0,300,1500,3000,5000,12000], userId: charlesInst.id, routeId: route4.id}),//super fast.. (to test against test runner)
          // db.model('routetime').create({personalTimeMarker: [0,11000,23000,35000,47000,59000], userId: gabiInst.id, routeId: route4.id}),

          // db.model('routetime').create({personalTimeMarker: [0,300,1500,3000,5000,12000,14000,16000,18000,20000,22000,24000,26000,28000,30000,32000,34000,36000,38000,40000,43000],
          // jsonLatLongCoords: [{latitude: 41.809590, longitude:-87.596837},{latitude: 41.809686, longitude:-87.592427},{latitude: 41.808071, longitude:-87.590689},{latitude: 41.805676, longitude:-87.589218},{latitude: 41.802476, longitude:-87.587889},{latitude: 41.801058, longitude:-87.587528},{latitude: 41.801058, longitude:-87.5874},{latitude: 41.801058, longitude:-87.5873},{latitude: 41.801058, longitude:-87.5872},{latitude: 41.801058, longitude:-87.5871},{latitude: 41.801058, longitude:-87.5870},{latitude: 41.801058, longitude:-87.5869},{latitude: 41.801058, longitude:-87.5868},{latitude: 41.801058, longitude:-87.5867},{latitude: 41.801058, longitude:-87.5866},{latitude: 41.801058, longitude:-87.5865},{latitude: 41.801058, longitude:-87.5864},{latitude: 41.801058, longitude:-87.5863},{latitude: 41.801058, longitude:-87.5862},{latitude: 41.801058, longitude:-87.5861},{latitude: 41.801058, longitude:-87.5855}],
          // checkpointTimeMarker: [0,22000,42000],
          // userId: charlesInst.id, routeId: route5.id}),//super fast.. (to test against test runner)

          // db.model('routetime').create({
          //   personalTimeMarker: charlesRoute["users"][0]["routetimes"][0]["personalTimeMarker"],
          //   checkpointTimeMarker: charlesRoute["users"][0]["routetimes"][0]["checkpointTimeMarker"],
          //   latLongArrArrStr: charlesRoute["users"][0]["routetimes"][0]["personalCoords"],
          //   userId: charlesInst.id, routeId: route6.id,
          //   startTime: charlesRoute["users"][0]["routetimes"][0]["startTime"],
          //   endTime: charlesRoute["users"][0]["routetimes"][0]["endTime"],
          // }),

          // db.model('routetime').create({
          //   personalTimeMarker: GabisRunonCharlesRoute["users"][0]["routetimes"][0]["personalTimeMarker"],
          //   checkpointTimeMarker: GabisRunonCharlesRoute["users"][0]["routetimes"][0]["checkpointTimeMarker"],
          //   latLongArrArrStr: GabisRunonCharlesRoute["users"][0]["routetimes"][0]["personalCoords"],
          //   userId: gabiInst.id, routeId: route6.id, 
          //   startTime: GabisRunonCharlesRoute["users"][0]["routetimes"][0]["startTime"],
          //   endTime: GabisRunonCharlesRoute["users"][0]["routetimes"][0]["endTime"],
          // }),
          // db.model('routetime').create({
          //   personalTimeMarker: [0,2000,4000,7000,8000,10000,30000,50000,80000,100000,150000,200000,250000,300000,400000,500000,650000,800000,100000,1100000,1200000],
          //   checkpointTimeMarker: [0, 150000, 1200000],
          //   jsonLatLongCoords: [{latitude: 41.809690, longitude: -87.596837}, {latitude: 41.809686, longitude: -87.592627}, {latitude: 41.808071, longitude: -87.590589}, {latitude: 41.805676, longitude: -87.589518}, {latitude: 41.802476, longitude: -87.587489}, {latitude: 41.801058, longitude: -87.587428}, {latitude: 41.801058, longitude: -87.5873}, {latitude: 41.801058, longitude: -87.5872}, {latitude: 41.801058, longitude: -87.5871}, {latitude: 41.801058, longitude: -87.5870}, {latitude: 41.801058, longitude: -87.5869}, {latitude: 41.801058, longitude: -87.5867}, {latitude: 41.801058, longitude: -87.5866}, {latitude: 41.801058, longitude: -87.5865}, {latitude: 41.801058, longitude: -87.5864}, {latitude: 41.801058, longitude: -87.5863}, {latitude: 41.801058, longitude: -87.5862}, {latitude: 41.801058, longitude: -87.5861}, {latitude: 41.801058, longitude: -87.5859}, {latitude: 41.801058, longitude: -87.5858}, {latitude: 41.801058, longitude: -87.5857}],
          //   userId: charlesInst.id, routeId: route7.id, 
          //   startTime: 1494506220000,
          //   endTime: 1494507420000,
          // }),
           db.model('routetime').create({
            personalTimeMarker: [ 0,
                                  2000,
                                  4000,
                                  6000,
                                  8000,
                                  10000,
                                  12000,
                                  14000,
                                  16000,
                                  18000,
                                  20000,
                                  22000,
                                  24000,
                                  26000,
                                  28000,
                                  30000,
                                  32000,
                                  34000,
                                  36000,
                                  38000,
                                  40000,
                                  42000,
                                  44000,
                                  46000,
                                  48000,
                                  50000,
                                  52000,
                                  54000,
                                  56000,
                                  58000,
                                  60000,
                                  62000,
                                  64000,
                                  66000,
                                  68000,
                                  70000,
                                  72000,
                                  74000,
                                  76000,
                                  78000,
                                  80000,
                                  82000,
                                  84000,
                                  86000,
                                  88000,
                                  90000,
                                  92000,
                                  94000,
                                  96000,
                                  98000,
                                  100000,
                                  102000,
                                  104000,
                                  106000,
                                  108000,
                                  110000,
                                  112000,
                                  114000,
                                  116000,
                                  118000,
                                  120000,
                                  122000,
                                  124000,
                                  126000,
                                  128000,
                                  130000,
                                  132000,
                                  134000,
                                  136000,
                                  138000,
                                  140000,
                                  142000,
                                  144000,
                                  146000,
                                  148000,
                                  150000,
                                  152000,
                                  154000,
                                  156000,
                                  158000,
                                  160000,
                                  162000,
                                  164000,
                                  166000,
                                  168000,
                                  170000,
                                  172000,
                                  174000 ],
            checkpointTimeMarker: [0, 50000, 100000, 150000, 174000],
            jsonLatLongCoords: [
                                { latitude: 41.948974, longitude: -87.65917 },
                                { latitude: 41.948474, longitude: -87.65917 },
                                { latitude: 41.947974, longitude: -87.65917 },
                                { latitude: 41.947474, longitude: -87.65917 },
                                { latitude: 41.946974, longitude: -87.65917 },
                                { latitude: 41.946474, longitude: -87.65917 },
                                { latitude: 41.945974, longitude: -87.65917 },
                                { latitude: 41.945474, longitude: -87.65917 },
                                { latitude: 41.944974, longitude: -87.65917 },
                                { latitude: 41.944474, longitude: -87.65917 },
                                { latitude: 41.943974, longitude: -87.65917 },
                                { latitude: 41.943474, longitude: -87.65917 },
                                { latitude: 41.942974, longitude: -87.65917 },
                                { latitude: 41.942474, longitude: -87.65917 },
                                { latitude: 41.941974, longitude: -87.65917 },
                                { latitude: 41.941474, longitude: -87.65917 },
                                { latitude: 41.940974, longitude: -87.65917 },
                                { latitude: 41.940474, longitude: -87.65917 },
                                { latitude: 41.939974, longitude: -87.65917 },
                                { latitude: 41.939474, longitude: -87.65917 },
                                { latitude: 41.938974, longitude: -87.65917 },
                                { latitude: 41.938474, longitude: -87.65917 },
                                { latitude: 41.937974, longitude: -87.65917 },
                                { latitude: 41.937474, longitude: -87.65917 },
                                { latitude: 41.936974, longitude: -87.65917 },
                                { latitude: 41.936474, longitude: -87.65917 },
                                { latitude: 41.935974, longitude: -87.65917 },
                                { latitude: 41.935474, longitude: -87.65917 },
                                { latitude: 41.934974, longitude: -87.65917 },
                                { latitude: 41.934474, longitude: -87.65917 },
                                { latitude: 41.933974, longitude: -87.65917 },
                                { latitude: 41.933474, longitude: -87.65917 },
                                { latitude: 41.932974, longitude: -87.65917 },
                                { latitude: 41.932566, longitude: -87.65917 }, 
                                { latitude: 41.932566, longitude: -87.658678 },
                                { latitude: 41.932566, longitude: -87.658178 },
                                { latitude: 41.932566, longitude: -87.657678 },
                                { latitude: 41.932566, longitude: -87.657178 },
                                { latitude: 41.932566, longitude: -87.656678 },
                                { latitude: 41.932566, longitude: -87.656178 },
                                { latitude: 41.932566, longitude: -87.655678 },
                                { latitude: 41.932566, longitude: -87.655178 },
                                { latitude: 41.932566, longitude: -87.654678 },
                                { latitude: 41.932566, longitude: -87.654178 },
                                { latitude: 41.932566, longitude: -87.653678 },
                                { latitude: 41.932566, longitude: -87.653178 },
                                { latitude: 41.932566, longitude: -87.652678 },
                                { latitude: 41.932566, longitude: -87.652178 },
                                { latitude: 41.932566, longitude: -87.651678 },
                                { latitude: 41.932566, longitude: -87.651178 },
                                { latitude: 41.932566, longitude: -87.650678 },
                                { latitude: 41.932566, longitude: -87.650178 },
                                { latitude: 41.932566, longitude: -87.649678 },
                                { latitude: 41.932566, longitude: -87.649178 },
                                { latitude: 41.932566, longitude: -87.648678 },
                                { latitude: 41.932566, longitude: -87.648178 },
                                { latitude: 41.932566, longitude: -87.647678 },
                                { latitude: 41.932566, longitude: -87.647178 },
                                { latitude: 41.932566, longitude: -87.646678 },
                                { latitude: 41.932566, longitude: -87.646178 },
                                { latitude: 41.932566, longitude: -87.645678 },
                                { latitude: 41.932566, longitude: -87.645178 },
                                { latitude: 41.932566, longitude: -87.644678 },
                                { latitude: 41.932566, longitude: -87.644178 },
                                { latitude: 41.932566, longitude: -87.643678 },
                                { latitude: 41.932566, longitude: -87.643178 },
                                { latitude: 41.932566, longitude: -87.642678 },
                                { latitude: 41.932566, longitude: -87.642178 },
                                { latitude: 41.932566, longitude: -87.641678 },
                                { latitude: 41.932566, longitude: -87.641178 },
                                { latitude: 41.932566, longitude: -87.640678 },
                                { latitude: 41.932566, longitude: -87.640178 },
                                { latitude: 41.932566, longitude: -87.639678 },
                                { latitude: 41.932566, longitude: -87.639276},
                                { latitude: 41.932566, longitude: -87.639276 },
                                { latitude: 41.932066, longitude: -87.639276 },
                                { latitude: 41.931566, longitude: -87.639276 },
                                { latitude: 41.931066, longitude: -87.639276 },
                                { latitude: 41.930566, longitude: -87.639276 },
                                { latitude: 41.930066, longitude: -87.639276 },
                                { latitude: 41.929566, longitude: -87.639276 },
                                { latitude: 41.929066, longitude: -87.639276 },
                                { latitude: 41.928566, longitude: -87.639276 },
                                { latitude: 41.928066, longitude: -87.639276 },
                                { latitude: 41.927566, longitude: -87.639276 },
                                { latitude: 41.927066, longitude: -87.639276 },
                                { latitude: 41.926566, longitude: -87.639276 },
                                { latitude: 41.926066, longitude: -87.639276 }
                                ],
            userId: gabiInst.id, routeId: route8.id, 
            startTime: 1494506220000,
            endTime: 1494507394000,
          }),

        ])
    .then(routetimes => {
      // routetime1 = routetimes[0],
      // routetime2 = routetimes[1],
      // routetime3 = routetimes[2],
      // routetime4 = routetimes[3]
      // console.log('routetime 3 ', routetime3, 'routetime 2', routetime2)

      // routetime3.setRacerTime(routetime2)
    })


  })
