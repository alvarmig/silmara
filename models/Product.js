const Sequelize = require('sequelize');
const db = require('../config/database');
const Category = require('./Category');

const Product = db.define('product', {
    product_id:{
        type: Sequelize.INTEGER, 
        primaryKey: true                    
    },
    product_name:{
        type: Sequelize.STRING
    },
    product_description:{
        type: Sequelize.STRING
    },
    product_price:{
        type: Sequelize.INTEGER                     
    },
    product_stock:{
        type: Sequelize.INTEGER                     
    },
    product_category_id:{
        type: Sequelize.INTEGER                     
    }
});

Category.hasMany(Product, { foreignKey: 'product_category_id' });
Product.belongsTo(Category, { foreignKey: 'product_category_id' });

module.exports = Product;