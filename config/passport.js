const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../config/database');


// Load User Model 
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // Match user in the db
            User.findOne({where:{ email: email }})
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    // Match the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, { message: 'Password incorrect'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.customer_id);
      });
    
    passport.deserializeUser(function(id, done) {
        User.findOne({where: {customer_id: id}})
            .then(user => {
                done(null, user);
            })
            .catch(err => console.log('Error:' + err));
    });

    /*passport.deserializeUser(function(id, done) {
        User.findAll({ where: {customer_id: id} })
            .then(user => {
                console.log(user);
                done(null, user);
            })
            .catch(err => console.log('Error:' + err));
    });*/

    /*passport.deserializeUser(function(id, done){
        db.query(`select * from customers where customer_id = ${id}`, function (err, rows){
            if(err) throw err;
            
            done(null, rows);
        });
    });*/
};