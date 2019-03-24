const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');



 
var app = express()
app.use(cookieParser())
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



// Passport Config
require('./configs/passport')(passport);


// Connect to MongoDB

mongoose
  .connect(
    "mongodb://localhost:27017/app",
    { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { expires: false}
  })
);




// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/api/auth/isauth' , require('./routes/api/auth/isAuth'));
app.use('/api/auth/login' , require('./routes/api/auth/login'));
app.use('/api/auth/logout' , require('./routes/api/auth/logout'));
app.use('/api/auth/register', require('./routes/api/auth/register'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));