const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const uuid = require('uuid')
var User = require("../models/user")

class UserService {
    async createUser(username, email, password) {
        return this.getUser(email).then((res)=>{
            if(res) {
                throw new Error("User already exists")
            }
            return User.create({
                username:username,
                email:email,
                password:password,
                id:uuid.v4()
            }).then((user)=>{
                return user
            }).catch((err)=>{
                throw new Error(err)
            })
        })
        
    }

    async getUser(email){
        return User.findOne({where:{email:email}})
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            throw new Error(err)
        })
    }
    
    async getUsers(){
        return User.findAll().then((res)=>{
            let dataVals = []
            res.forEach((val)=>{
                dataVals.push(val.dataValues)
            })
            console.log(dataVals)
            return(dataVals)
        }).catch((err)=>{
            throw new Error(err)
        })
    }

    generateAccessToken(username){
        return jwt.sign(username,dotenv.env.TOKEN_SECRET, {expiresIn:'30s'})
    }

}

module.exports = new UserService