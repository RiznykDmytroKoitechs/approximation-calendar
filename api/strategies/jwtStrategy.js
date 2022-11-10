var jwtStrategy = require('passport-jwt')
var UserService = require('../services/userServise')


const JWTStrategy = new jwtStrategy(opts, (payload, done)=>{
    UserService.getUser(payload.email)
    .then((res)=>{
        done(null, res)
    })
    .catch((err)=>{
        done(err, null)
    })
})