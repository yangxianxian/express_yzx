var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const redisStore = require('connect-redis')(session)
const redisServer = require('./db/myredis');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const streamPath = path.join(__dirname,'log','access.log')
const writeStream = fs.createWriteStream(streamPath,{
  flags:'a'//a是追加，w是覆盖
});
app.use(logger('dev',{
  stream:writeStream
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'Yang#zhen#xian5847514',
  cookie:{
    path:'/',
    maxAge:24*60*60*1000,
    httpOnly:true
  },
  store:new redisStore({ //把session中的值实时的存储到redis中
    client:redisServer
  })
}))
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/blog',blogRouter);

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
