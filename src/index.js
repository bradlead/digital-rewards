const express = require('express');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const expressListRoutes = require('express-list-routes');
const chalk = require('chalk');
const cors = require('cors');
const dotenv = require('dotenv');

const UserModel = require('./models/user');
const { auth, users, account } = require('./routes');

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

// database setup
app.use(router);
restify.serve(router, UserModel);
expressListRoutes({}, '\nEndpoints:', router);

// monzo setup
app.use('/auth', auth);
app.use('/users', users);
app.use('/account', account);

// hello world
app.get('/', (req, res) => res.json({ hello: 'world!' }));

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log(chalk.bgBlue.black('\nConnected to database\n'));
  app.listen(3000, () => {
    console.log(chalk.bgGreen.black('Server listening on http://127.0.0.1:3000\n'));
  });
});
