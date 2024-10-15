var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
// require('./models/category');
// require('./models/product');
require('./models/Lab3_models/category_lab3');
require('./models/Lab3_models/product_lab3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');

var routerCategory = require('./routes/Lab3/routerCategory');
var routerProduct = require('./routes/Lab3/routerProduct');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//connect database
mongoose.connect('mongodb+srv://Sallysayhiii:Noel1225%40@cluster0.m2q2g.mongodb.net/md19201')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

//localhost:3000/san-pham
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/san-pham', productRouter);
app.use('/loai-sp', categoryRouter);
app.use('/routerCategory', routerCategory);
app.use('/routerProduct', routerProduct);


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
