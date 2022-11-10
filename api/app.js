var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var passport = require('passport')
var { Sequelize } = require('sequelize');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./models/user');
var session = require('express-session')

var app = express();

const sequelize = new Sequelize({
  dialect:"sqlite",
  storage:"./main.db"
});


sequelize.authenticate().then(()=>{
  console.log("Database logged into")
  User.sync({alter:true})
}).catch(()=>{
  console.log("Error logging into database")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({
  secret:dotenv.env.TOKEN_SECRET,
  resave:false,
  saveUninitialized:false,
  rolling:true,
  cookie:{
    maxAge:60*1000,
    httpOnly:false
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
passport.use('jwt', jwtStrategy)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
