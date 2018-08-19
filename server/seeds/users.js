const User = require('../models/user');

function addInitialUsers(req,res){
    User.insertMany( [
        { fbId: "1", name: "susan", email:"susan@mail.com", password: '$2a$10$KObHY5DDYIdfwobBBL9gDuN78zSaWpq0EYnh6FMKgHwuZlsuvRooe', role: "admin"},
        { fbId: "2", name: "nio", email:"nio@mail.com", password:'$2a$10$zZ4bruUqI3VlJaQgx1r8UeeDYWeXytflnc55gmr.q9fnWlGFZ3jwe' }
     ] )
     .then(newUsers=>{
         res.status(201).json({
             msg : "successfully adding new users",
             newUsers
         })
     })
     .catch(err=>{
         res.status(500).json({msg:err.message})
     })
}

module.exports = addInitialUsers;