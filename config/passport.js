var LocalStrategy   = require('passport-local').Strategy;

var Team = require('../app/models/team');


module.exports = function(passport) {

    passport.serializeUser(function(team, done) {
        done(null, team.id);
        // console.log(team.id);
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

    function(req, team_name, team_location, team_od, team_man_name, team_man_num, team_man_mail, team_code, team_cap_name, team_cap_num, team_cap_mail, done) {
      process.nextTick(function() {
        if (!req.team) {
          Team.findOne({ 'manager.mail' :  team_man_mail }, function(err, team) {
            if (err)
            return done(err);
            if (team) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              // console.log(team.team_name);
            } else {
              var newTeam               = new Team();
              newTeam.team_name         = team_name;
              newTeam.location          = team_location;
              newTeam.date              = team_od;
              newTeam.manager.name      = team_man_name;
              newTeam.manager.number    = team_man_num;
              newTeam.manager.mail      = team_man_mail;
              newTeam.manager.password  = newTeam.generateHash(team_code);
              newTeam.captain.name      = team_cap_name;
              newTeam.captain.number    = team_cap_num;
              newTeam.captain.mail      = team_cap_mail;

              newTeam.save(function(err) {
                if (err)
                throw err;
                return done(null, newTeam);
              });
            }
          });
        }
      });
    }));



  };
