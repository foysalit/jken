
var passport = require('passport');
var _ = require('lodash');
// These are different types of authentication strategies that can be used with Passport. 
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
var db = require('./sequelize');

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find({where: {id: id}}).success(function(user){
        console.log('Session: { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
    }).error(function(err){
        done(err, null);
    });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    db.User.find({ where: { username: username }}).success(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!user.authenticate(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        console.log('Login (local) : { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
      }
    }).error(function(err){
      done(err);
    });
  }
));

module.exports = passport;

