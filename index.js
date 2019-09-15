const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/products', require('./routes/api/products')); // Product API route

// Database config
//const db = require('./config/database');

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser Middleware
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes Login
app.use('/login', require('./routes/login')); // login route
app.use('/users', require('./routes/users')); // users route

const PORT = process.env.PORT || 5000; // Server look for environment variable or run on port 5000

app.listen(PORT, () => console.log(`Serve started on port ${PORT}`));
