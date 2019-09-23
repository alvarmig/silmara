const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name,
        email: req.user.email
    })
);

// User
router.get('/user', (req, res) => { 
    if(req.user == undefined){
        res.json('');
      }else {  
        res.json( {name: req.user.name})
      }
});

module.exports = router;