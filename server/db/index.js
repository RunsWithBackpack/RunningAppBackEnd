var db = require('./db')
var User = require('./models/user')
var Level = require('./models/levels')
var League = require('./models/leagues')
var Mission = require('./models/missions')
var Phase = require('./models/phases')
var Requirement = require('./models/requirements')
var Resource = require('./models/resources')
var User_Mission = require('./models/user_missions')
var Group = require('./models/group')
var Sequelize = require('sequelize')


User.hasMany(User_Mission)
User.hasMany(Phase)
User.belongsTo(Group) //Group.hasMany(User)
User.belongsTo(League) //League.hasMany(User) *** User or group?

Level.hasMany(Phase)
Level.hasMany(Mission)

Mission.hasOne(Requirement)
Mission.hasMany(User_Mission)

League.hasMany(Level)

Group.belongsTo(League) //League.hasMany(Group)


// db.sync({force: true})
// .then(()=> {
//     console.log('db is synced and "running"')
// })

module.exports = {
    db,
    User,
    Level,
    League,
    Mission,
    Phase,
    Resource,
    User_Mission,
    Group,
}
