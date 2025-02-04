const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, './config.env') })

const config = require('./config/config');
const database = require('./database/db');

const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', userRoute);
app.use('/api', orderRoute);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    database.connection.close(() => {
      console.log('MongoDB connection disconnected through app termination');
      process.exit(0);
    });
  });
