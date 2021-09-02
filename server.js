const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

//this is the whitelist for frontend domain and ports
var corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://192.168.0.145:3000',
    '192.168.0.152',
  ],
};
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application' });
});

const tasksRouter = require('./app/routes/tasks');
app.use('/tasks', tasksRouter);

const columnRouter = require('./app/routes/columns');
app.use('/columns', columnRouter);

const columnOrderRouter = require('./app/routes/columnOrders');
app.use('/column-order', columnOrderRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECT;

mongoose.set('useFindAndModify', false);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
