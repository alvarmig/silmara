const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const db = require('./routes/api/tblSilmaraAdapters');

const app = express();

// init middleware
//app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'));
app.use('/api/items', require('./routes/api/tblSilmaraAdapters'));

const PORT = process.env.PORT || 5000; // Server look for environment variable or run on port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
