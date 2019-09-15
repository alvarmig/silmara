const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('customer', {
    customer_id:{
        type: Sequelize.INTEGER, 
        primaryKey: true                    
    },
    name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    create_date:{
        type: Sequelize.DATE, defaultValue: Sequelize.NOW                                             
    }
});

module.exports = User;