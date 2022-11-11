const uuid = require('uuid')
var User = require("../models/user")

class UserService {
    async createUser(username, email, password) {
        return this.getUserByEmail(email).then((res)=>{
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

    async getUserByEmail(email){
        return User.findOne({where:{email:email}})
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            throw new Error(err)
        })
    }

    getUserByID(id){
        return User.findOne({where:{id:id}})
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
            return(dataVals)
        }).catch((err)=>{
            throw new Error(err)
        })
    }
}

module.exports = new UserService