var dotenv = require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var passport = require('passport')
var { Sequelize } = require('sequelize');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var entryRouter = require('./routes/entries');
var User = require('./models/user');
var Entry = require('./models/entry');
var session = require('express-session')
var UserService = require('./services/userServise')
var app = express();

const sequelize = new Sequelize({
  dialect:"sqlite",
  storage:"./main.db"
});


sequelize.authenticate().then(()=>{
  console.log("Database logged into")
  User.sync({alter:true})
  Entry.sync({alter:true})
}).catch(()=>{
  console.log("Error logging into database")
})

const JWTStrategy = new JwtStrategy({
  secretOrKey:process.env.TOKEN_SECRET,
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done)=>{
  if(payload.exp < Date.now()){
    UserService.getUserByID(payload.id)
    .then((res)=>{
      console.log(payload)
      if(res){
        done(null, res.dataValues)
      }
      else {
        done(new Error("Auth error"), null)
      }
    })
    .catch((err)=>{
      done(err, null)
    })
  }
  else{
    done(new Error("Token expired"), null)
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({
  secret:process.env.TOKEN_SECRET,
  resave:false,
  saveUninitialized:false,
  rolling:true,
  cookie:{
    maxAge:60*1000,
    httpOnly:false
  }
}))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
passport.use('jwt', JWTStrategy)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/entries', entryRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
