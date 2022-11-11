var express = require('express');
var AuthService = require('../services/authServise')
var router = express.Router();

router.post('/', (req, res, next)=>{
    const body = req.body
    AuthService.login(body.email, body.password).then((result)=>{
        res.send({token:result});
    }).catch((err)=>{
        console.log(err)
        res.status(404).send(err)
    })
})

module.exports = router;