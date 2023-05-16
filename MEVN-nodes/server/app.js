const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
let { expressjwt: jwt } = require("express-jwt");

require('dotenv').config();

const NodesRouter = require('./routes/NodesRoute');
const usersRouter = require('./routes/userRoute');


const app = express();
const api = process.env.API_URL
app.use(cors());
app.options('*', cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/public/images', express.static(__dirname + '/public/images'));


app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// # # # #  authJwt  # # # #

app.use(
    jwt({
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
      isRevoked: isRevoked
    }).unless({
      path: [
        {url: /\/public\/images(.*)/ , methods: ['GET', 'OPTIONS']},
        {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS']},
        {url: /\/api\/v1\/users(.*)/ , methods: ['GET', 'OPTIONS']},
          `/\\/api\\/v1\\/products(.*)/`,
          `${api}/users/register`,
          `${api}/users/login`,
      ]
    })
);
async function isRevoked(req, token) {
  if (token.payload.isAdmin == false) {
    return true;
  }
  return false;
}

app.use(`${api}/nodes`, NodesRouter);
app.use(`${api}/users`, usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
