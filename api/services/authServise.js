const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

class AuthService {
    

    generateAccessToken(username){
        return jwt.sign(username,dotenv.env.TOKEN_SECRET, {expiresIn:'30s'})
    }

}

module.exports = new AuthService