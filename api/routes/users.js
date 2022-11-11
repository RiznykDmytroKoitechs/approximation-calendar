var express = require('express');
var UserService = require('../services/userServise')
var router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', (req, res, next) => {
  UserService.getUsers().then((result)=>{
    res.send({users:result});
  }).catch((err)=>{
    console.log(err)
    res.status(404).send(err)
  })
});

router.post('/', 
body('username').isLength({min:5, max:20}).withMessage('Username length is invalid'), 
body('password').isLength({min:5,max:20}).withMessage('Password length is invalid'), 
body('email').isEmail().withMessage('Email is invalid'), 
(req, res, next)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const body = req.body
  UserService.createUser(body.username, body.email, body.password)
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    console.log(err)
    res.status(400).send(err.message)
  })
})

module.exports = router;
