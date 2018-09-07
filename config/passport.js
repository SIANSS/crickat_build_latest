var LocalStrategy   = require('passport-local').Strategy;
var User = require('../app/models/user');
var Team = require('../app/models/team');


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, team.id);
    });

    passport.deserializeUser(function(id, done) {
        Team.findById(id, function(err, team) {
            done(err, team);
        });
    });


    passport.use('local-signup', new LocalStrategy({
      teamnameField         : 'team_name',
      teamlocationField     : 'team_location',
      teamorigindataField   : 'team_od',
      teammannameField      : 'team_man_name',
      teammannumberField    : 'team_man_num',
      teammanmailField      : 'team_man_mail',
      passwordField         : 'team_code',
      teamcapnameField      : 'team_cap_name',
      teamcapnumField       : 'team_cap_num',
      teamcapmailFIeld      : 'team_cap_mail',
      passReqToCallback : true
    },

    function(req, tname, tlocation, tod, tmanname, tmannum, tmanmail, code, tcapname, tcapnum, tcapmail, done) {
      process.nextTick(function() {
        if (!req.team) {
          Team.findOne({ 'team_name' :  tmanmail }, function(err, team) {
            if (err)
            return done(err);
            if (team) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
              var newTeam               = new Team();
              newTeam.team_name         = tname;
              newTeam.location          = tlocation;
              newTeam.date              = tod;
              newTeam.manager.name      = tmanname;
              newTeam.manager.number    = tmannum;
              newTeam.manager.mail      = tmanmail;
              newTeam.manager.password  = code;
              newTeam.local.password    = newUser.generateHash(password);
              newUser.save(function(err) {
                if (err)
                throw err;
                return done(null, newUser);
              });
            }
          });
        } else {
          var user            = req.user;
          user.local.email    = email;
          user.local.password = user.generateHash(password);

          user.save(function(err) {
            if (err)
            throw err;
            return done(null, user);
          });
        }
      });
    }));


    passport.use('local-login', new LocalStrategy({

      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
        return done(err);

        if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));


        if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));


        return done(null, user);
      });

    }));
  };
