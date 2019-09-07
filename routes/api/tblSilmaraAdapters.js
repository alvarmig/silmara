const express = require('express');
const mysql = require('mysql');
const router = express.Router(); // required to use routes

// Create connection
const pool = mysql.createPool({
  connectionLimit: 2,
  host: 'localhost',
  user: 'root',
  password: 'oracle',
  database: 'silmara'
});

// Connect
pool.getConnection((err, connection) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  console.log('MySQL Connected');
});

// Select Items GET
router.get('/', (req, res) => {

  let sql = `CALL selectProducts`;

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;

    res.json(results[0]);
    console.log(results);
  });
});

// Select Items Category GET
router.get('/category/:category', (req, res) => {

  let sql = `CALL selectProductsCaregory("${req.params.category}")`;

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;

    res.json(results[0]);
    console.log(results);
  });
});

// Select Single Product GET
router.get('/product/:id', (req, res) => {
  let sql = `CALL selectProductsByID("${req.params.id}")`;

  let query = pool.query(sql, (err, results) => {
    if (err) throw err;

    res.json(results[0]);
    console.log(results);
  });
});

module.exports = pool;
module.exports = router;
