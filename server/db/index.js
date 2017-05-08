var db = require('./db')
var User = require('./models/users')
// var Level = require('./models/levels')
var League = require('./models/leagues')
// var Mission = require('./models/missions')
// var Phase = require('./models/phases')
// var Requirement = require('./models/requirements')
// var Resource = require('./models/resources')
// var User_Mission = require('./models/user_missions')
var Group = require('./models/groups')
var League = require('./models/leagues')
var Route = require('./models/routes')
var Routetime= require('./models/routetimes')
var Sequelize = require('sequelize')


// User.hasMany(User_Mission)
// User.hasMany(Phase)

//
User.hasMany(Routetime) //RouteTime is a kuje join table between User and Routes, but different from UserAndRoutes because it contains a time array representing what time a runner got to a location (the time array has equivalent length to routes coordinates)..
Routetime.belongsTo(User)
// Routetime.hasOne(User)

// User.belongsToMany(Routetime, {through: 'UserAndRouteTimes'}) //RouteTime is a kuje join table between User and Routes, but different from UserAndRoutes because it contains a time array representing what time a runner got to a location (the time array has equivalent length to routes coordinates)..
// Routetime.hasOne(User)

Route.hasMany(Routetime)
Routetime.belongsTo(Route)


User.belongsToMany(Route, {through: 'UserAndRoutes'})// The reason we are doing user has many routes, and routes has many users is because it is difficult to just get to routes through routetime (because one user can have many routetimes for a single route.. so it might just get a tad messy navigating from routes to time to user, or vice versa)
Route.belongsToMany(User, {through: 'UserAndRoutes'})//UserAndRoutes is our join table

User.belongsTo(Group) //Group.hasMany(User)
// User.belongsTo(League) //League.hasMany(User) *** User or group?

// Level.hasMany(Phase)
// Level.hasMany(Mission)
//
// Mission.hasOne(Requirement)
// Mission.hasMany(User_Mission)

// League.hasMany(Level)

Group.belongsTo(League) //League.hasMany(Group)



// db.sync({force: true})
// .then(()=> {
//     console.log('db is synced and "running"')
// })

module.exports = {
    db,
    User,
    // Level,
    // League,
    // Mission,
    // Phase,
    // Resource,
    // User_Mission,
    Group,
    Route,
    Routetime,
}
