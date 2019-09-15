const express = require('express');
const router = express.Router();
// Database 
const db = require('../../config/database');
const Product = require('../../models/Product');
const Category = require('../../models/Category');


// GET- Select product list 
router.get('/', (req, res) =>
  Product.findAll()
    .then(products => {
      res.json(products);
    })
    .catch(err => console.log(err))
);

// GET - Select Items by Category JOIN
router.get('/category/:category', (req, res) =>
  Product.findAll({
    include: [
      {
        model: Category,
        where: {category_name: `${req.params.category}` },
        required: true
      }
    ]
  })
    .then(products => {
      res.json(products);
    })
    .catch(err => console.log(err))
);

// Select Item by id GET
router.get('/product/:id', (req, res) =>
  db
    .query(`CALL SelectProductsByID(${req.params.id})`)
    .then(([results, metadata]) => {
      res.json(results);
      console.log(results);
    })
    .catch(err => console.log(err))
);

// Select Items by Category GET
/*router.get('/category/:category', (req, res) =>
  db
    .query(`CALL selectProductsCategory("${req.params.category}")`, {
      plain: false,
      raw: true,
      type: db.QueryTypes.SELECT
    })
    .then(([results, metadata]) => {
      res.json(results);
      console.log(results);
    })
    .catch(err => console.log(err))
);*/
module.exports = router;
