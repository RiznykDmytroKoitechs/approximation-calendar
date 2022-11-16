const jwt = require('jsonwebtoken')
var UserService = require('./userServise')


class AuthService {
    generateAccessToken(id){
        return jwt.sign({id},process.env.TOKEN_SECRET, {expiresIn:'1h'})
    }

    login(email, password){
        return UserService.getUserByEmail(email)
        .then((result)=>{
            if(!result){
                throw new Error("Email is invalid!")
            }
            else if (result.password != password) {
                throw new Error("Password is invalid")
            }
            else {
                return {token:this.generateAccessToken(result.id)}
            }
        })
    }

    register(username, email, password){
        return UserService.createUser(username, email, password)
        .then((result)=>{
            return {token:this.generateAccessToken(result.id)}
        })
    }

}

module.exports = new AuthService