const Sequelize = require('sequelize');
const db = require('../config/database');

const Category = db.define('product_categories', {
    category_id:{
        type: Sequelize.INTEGER, 
        primaryKey: true                    
    },
    category_name:{
        type: Sequelize.STRING
    }
})

module.exports = Category;