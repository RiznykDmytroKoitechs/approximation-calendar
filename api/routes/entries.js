var express = require('express');
var EntryService = require('../services/entryServise')
var router = express.Router();
var passport = require('passport')
const { body, validationResult } = require('express-validator');

const dateValidator = (req, res, next)=>{
    if(typeof(req.body.date)!=="undefined"){
        const reqestDate = new Date(req.body.date)
        if(reqestDate.toString()==="Invalid Date" || reqestDate > Date.now() || reqestDate < (Date.now()- 1000*60*60*24)){
            return res.status(400).send("Invalid Date")
        }
    }
    next()
}

router.all('/',passport.authenticate('jwt', {session:false}), 
(req, res, next)=>{
    next()
})

router.post('/',
dateValidator,
body('hours').isFloat({min:0.01, max:10}).withMessage("Enter a valid amount of hours"),
(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {date, hours, comment} = req.body
    console.log(date,hours,comment)
    EntryService.createEntry({date, hours, comment, ownerId:req.user.id}).then((result)=>{
        res.send({token:result});
    }).catch((err)=>{
        console.log(err)
        res.status(400).send({message:err.message})
    })
})

router.put('/',
dateValidator,
body('hours').optional().isFloat({min:0.01, max:10}).withMessage("Enter a valid amount of hours"),
body('id').isUUID('4').withMessage("Invalid ID"),
(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {date, hours, comment, id} = req.body
    console.log(date,hours,comment, id)
    EntryService.editEntry({date, hours, comment, id}).then((result)=>{
        res.send({token:result});
    }).catch((err)=>{
        console.log(err)
        res.status(400).send({message:err.message})
    })
})


router.get('/',
dateValidator,
body('pagination').optional().isInt({max:40, min:1}).withMessage("Invalid pagination"),
body('page').optional().isInt({min:0}).withMessage("Invalid page"),
(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {pagination, page} = req.body
    EntryService.getEntriesByUserId(req.user.id, pagination, page)
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).send({message:err.message})
    })
})

module.exports = router;