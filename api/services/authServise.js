const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const uuid = require('uuid')


class AuthService {
    users = []
    createUser(name, email, password) {
        this.users.push({
            name:name,
            email:email,
            password:password,
            id:uuid.v5()
        })
    }
    getUsers(){
        return this.users
    }
}