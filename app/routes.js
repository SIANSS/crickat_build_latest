module.exports = function(app, passport) {

    app.get('/index', function(req, res) {
      res.render('index.ejs', {
        user : req.user
      });
    });

    app.get('/signup', function(req, res) {
      res.render('register.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/index',
      failureRedirect : '/signup',
      failureFlash : true
    }));

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/index',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/connect/local', function(req, res) {
      res.render('connect-local.ejs', { message: req.flash('loginMessage')});
    });
    //
    app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/connect/local',
      failureFlash : true
    }));
    //
    app.get('/unlink/local', function(req, res) {
      res.redirect("/");
      // var user            = req.user;
      // user.local.email    = undefined;
      // user.local.password = undefined;
      // user.save(function(err) {
      //   res.redirect('/');
      // });
    });

  };

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
    return next();

    res.redirect('/');
  }
