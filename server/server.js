const path = require('path');
const express = require('express');
// const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const apiRouter = require('./routes/api');
const userController = require('./controllers/userController.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

/**
 * signup
 */

app.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful sign up?
  res.status(301).send('Created account');
});

/**
 * handle requests for static files
 */
// app.use(express.static(path.resolve(__dirname, '../client')));
// statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
