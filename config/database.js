const Sequelize = require('sequelize');

const db = new Sequelize('silmara', 'root', 'oracle', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  storage: './session.sqlite',
  define: {
    timestamps: false
  }
  ,logging: false
});

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error' + err));

module.exports = db;
