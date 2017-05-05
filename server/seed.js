var dbIndex = require('./db');
var db= dbIndex.db;

let route1, route2;
let alyssaInst, gabbyInst, charlesInst;

// {
//   id: 1,
//   coords: [{latitude: 37, longitude: -122},{latitude: 36.5, longitude: -121},{latitude: 36.25, longitude: -119.5}],//this is routes array
//   routetimes: [
//     {timesArr: [0,7,16,24], user: {username: 'Alyssa'}},//these are times arrays associated with routes, and the times arrays also have their associated user
//     {timesArr: [0,8,16,25], user: {username: 'Gabi'}},
//     {timesArr: [0,5,10,19], user: {username: 'Charles'}}
//   ],
// },
// {
//   id: 2,
//   coords: [{latitude: 35, longitude: -118},{latitude: 35.75, longitude: -119.75},{latitude: 35.5, longitude: -119.5}],//this is routes array
//   routetimes: [
//     {timesArr: [0,7,16,24], user: {username: 'Alyssa'}},
//     {timesArr: [0,8,16,25], user: {username: 'Gabi'}},
//     {timesArr: [0,5,10,19], user: {username: 'Charles'}}
//     ],
// }

db.sync({force: true})
.then(()=>{
  console.log('db has synced. seeding');
  return Promise.all([
    db.model('user').create({email: 'alyssa@alyssa.com', password: 1234, username: 'runswithbackpack!', city: 'Chicago',}),
    db.model('user').create({email: 'gabby@gabby.com', password: 1234, username: 'gabbby', city: 'Chicago',}),
    db.model('user').create({email: 'charles@charles.com', password: 1234, username: 'charliieee', city: 'Chicago',}),
  ])
})
.then(users=>{
    alyssaInst=users[0];
    gabbyInst=users[1];
    charlesInst=users[2];

    return Promise.all([
      db.model('route').create({coords: [[37,-122],[36.5,-121],[36.25,-119.5]]}),
      db.model('route').create({coords: [[35,-118],[35.75,-119.75],[35.5,-119.5]]}),
    ])
  })
.then(routes=>{
  route1 = routes[0];
  route2 = routes[1];
  charlesInst.addRoute(route1);
  charlesInst.addRoute(route2);
  alyssaInst.addRoute(route1);
  alyssaInst.addRoute(route2);
  gabbyInst.addRoute(route2);

  return Promise.all([
          db.model('routetime').create({timesArr: [0,5,10,20], userId: charlesInst.id, routeId: route1.id}),
          db.model('routetime').create({timesArr: [0,7,16,24], userId: alyssaInst.id, routeId: route1.id}),
          db.model('routetime').create({timesArr: [0,7,16,23], userId: alyssaInst.id, routeId: route1.id}),
          db.model('routetime').create({timesArr: [0,8,16,25], userId: gabbyInst.id, routeId: route1.id}),

          db.model('routetime').create({timesArr: [0,5,10,20], userId: charlesInst.id, routeId: route2.id}),
          db.model('routetime').create({timesArr: [0,8,16,25], userId: gabbyInst.id, routeId: route2.id}),
        ])
  })
// .then(()=>{
//   // console.log(userinst)
//   return userinst.getBestTime(routeId);
// })
// .then(instMethRet=>{
//   console.log('blah', instMethRet.runtime)
// })
