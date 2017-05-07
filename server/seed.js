var dbIndex = require('./db');
var db= dbIndex.db;

let route1, route2;
let alyssaInst, gabiInst, charlesInst;

db.sync({force: true})
.then(()=>{
  console.log('db has synced. seeding');
  return Promise.all([
    db.model('user').create({email: 'Alyssa@alyssa.com', password: 1234, username: 'runswithbackpack!', city: 'Chicago',}),
    db.model('user').create({email: 'Gabi@gabi.com', password: 1234, username: 'ggabbiSUCHACOOLNAME', city: 'Chicago',}),//I know how much it means to you, so i spelled your name correctly this time
    db.model('user').create({email: 'Charles@charles.com', password: 1234, username: 'charliieee', city: 'Chicago',}),
  ])
})
.then(users=>{
    alyssaInst=users[0];
    gabiInst=users[1];
    charlesInst=users[2];

    return Promise.all([
      db.model('route').create({coords: [[37,-122],[36.5,-121],[36.25,-119.5]]}),
      db.model('route').create({coords: [[35,-118],[35.75,-119.75],[35.5,-119.5]]}),
      db.model('route').create({coords: [[38,-119],[37.75,-119.75],[37,-119]]}),
    ])
  })
.then(routes=>{
  route1 = routes[0];
  route2 = routes[1];
  route3 = routes[2];
  charlesInst.addRoute(route1);
  charlesInst.addRoute(route2);
  alyssaInst.addRoute(route1);
  alyssaInst.addRoute(route2);
  gabiInst.addRoute(route2);
  charlesInst.addRoute(route3);

  return Promise.all([
          db.model('routetime').create({timesArr: [0,5,10,20], userId: charlesInst.id, routeId: route1.id}),
          db.model('routetime').create({timesArr: [0,7,16,24], userId: alyssaInst.id, routeId: route1.id}),
          db.model('routetime').create({timesArr: [0,7,16,23], userId: alyssaInst.id, routeId: route1.id}),
          db.model('routetime').create({timesArr: [0,8,16,25], userId: gabiInst.id, routeId: route1.id}),

          db.model('routetime').create({timesArr: [0,5,10,20], userId: charlesInst.id, routeId: route2.id}),
          db.model('routetime').create({timesArr: [0,8,16,25], userId: gabiInst.id, routeId: route2.id}),

          db.model('routetime').create({timesArr: [0,8,16,19], userId: charlesInst.id, routeId: route3.id}),
          db.model('routetime').create({timesArr: [0,8,16,17], userId: charlesInst.id, routeId: route3.id}),
          db.model('routetime').create({timesArr: [0,8,16,18], userId: charlesInst.id, routeId: route3.id}),
        ])
  })
// .then(()=>{
//   // console.log(userinst)
//   return userinst.getBestTime(routeId);
// })
// .then(instMethRet=>{
//   console.log('blah', instMethRet.runtime)
// })
