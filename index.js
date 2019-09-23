const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const sessionStore = require('./config/session-database');
//const db = require('./config/database');

// initalize sequelize with session store
//const SequelizeStore = require('connect-session-sequelize')(session.Store);
//const MySQLStore = require('express-mysql-session')(session);

const app = express();

// Passport config
require('./config/passport')(passport);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser Middleware
app.use(express.urlencoded({ extended: false }));


// Express Session
app.use(
  session({
    secret: 'secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    
    /*store: new SequelizeStore({
      db: db,
      checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
      expiration: 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
    })*/
  })
);

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
  res.locals.login = req.isAuthenticated;
  res.locals.session = req.session;
  next();
});

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/api/products', require('./routes/api/products')); // Product API route

// Routes Login
app.use('/login', require('./routes/login')); // login route
app.use('/users', require('./routes/users')); // users route

const PORT = process.env.PORT || 5000; // Server look for environment variable or run on port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
