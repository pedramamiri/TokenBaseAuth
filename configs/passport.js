const LocalStrategy   = require('passport-local').Strategy;
const bcrypt          = require('bcryptjs');
// Load User model
const Company         = require('../models/company');
// load public key 
const fs              = require('fs');
const publicKEY       = fs.readFileSync('./configs/public.key', 'utf8');
//implement passport stategy
const passportJWT     = require("passport-jwt");
const JWTStrategy     = passportJWT.Strategy;



module.exports = function(passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
      },(username, password, done) => {
      // Match user
        Company.findOne({
          email: username
        }).then(user => {
          if (!user) {
            return done(null, false);
          }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) done(err, false)
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      })
  );
  passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey   : publicKEY
  },
  function (jwtPayload, done) {
    if(!jwtPayload) return done(err, false);
    Company.findOne({_id:jwtPayload.id})
        .then(user => {
          if(!user) return done(null, false);
          return done(null,user)
        })
        .catch(err => {
            return done(err,false);
        });   
  }
  ));
 

  
 
};



