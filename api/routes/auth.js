var express = require("express");
const { body, validationResult } = require("express-validator");
var AuthService = require("../services/authServise");
var router = express.Router();

router.post(
  "/",
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Invalid password"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    console.log(body);
    AuthService.login(body.email, body.password)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  }
);

/*router.post('/', (req, res)=>{
    const body = req.body
    AuthService.register(body.username ,body.email, body.password).then((result)=>{
        res.send({token:result});
    }).catch((err)=>{
        console.log(err)
        res.status(400).send(err)
    })
})*/
module.exports = router;
