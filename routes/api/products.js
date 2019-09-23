const express = require('express');
const router = express.Router();
// Database
const db = require('../../config/database');
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Cart = require('../../models/Cart');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET- Select product list
router.get('/', (req, res) =>
  Product.findAll({
    where: { product_id: { [Op.lte]: [10] } }
  })
    .then(products => {
        res.json(products); 
    })
    .catch(err => console.log(err))
);

// GET - Select product list BETWEEN a range of IDs
router.get('/page/:id', (req, res) => {
  let lastItem;
  let firstItem = req.params.id == 1 ? req.params.id : req.params.id * 10;

  if(firstItem == 1){
    lastItem = 10;
  }else{
      firstItem = req.params.id == 1 ? req.params.id : (req.params.id - 1) * 10;
      lastItem = req.params.id == 1 ? req.params.id : req.params.id * 10;
  }
  
  Product.findAll({
    where: { product_id: { [Op.between]: [firstItem, lastItem] } }
  })
    .then(products => {
      res.json(products);
    })
    .catch(err => console.log(err))
  });

// GET - Select Items by Category JOIN
router.get('/category/:category', (req, res) =>
  Product.findAll({
    include: [
      {
        model: Category,
        where: { category_name: `${req.params.category}` },
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
router.get('/product/:id', (req, res) => {
  db.query(`CALL SelectProductsByID(${req.params.id})`)
    .then(([results, metadata]) => {
      res.json(results);
      //console.log(results);
    })
    .catch(err => console.log(err));
});

// POST Shopping Cart
router.post('/add-to-cart/:id', (req, res) => {
  let id = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  console.log(cart);

  Product.findOne({ where: { product_id: id } })
    .then(product => {
      cart.add(product, product.product_id);
      //console.log(cart);
      req.session.cart = cart;

      //console.log(req.session.cart);
      res.redirect(req.get('referer'));
      //res.redirect('back');
    })
    .catch(err => console.log('Error:' + err));
});

// Shopping cart
router.get('/shopping-cart', (req, res) => {
  if(!req.session.cart){
      return res.render('cart', {products: null});

  }
  let cart = new Cart(req.session.cart);
  res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

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
