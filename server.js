var express  = require('express');
var app      = express(); //instantiating
var port     = process.env.PORT || 4446;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path      = require('path');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(path.join(__dirname, "/app/public")));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms


app.use(session({ secret: 'letsbreaksomecode' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
console.log('The magic happens on port ' + port);