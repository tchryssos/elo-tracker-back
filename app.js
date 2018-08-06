const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PRIVATE = require('./private')

// CONFIG
const app = express();
let mongoDB = PRIVATE.mongo_uri;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ROUTES
const player = require('./routes/player.route');
app.use('/players', player);


const port = 3030;
app.listen(port, () => {
    console.log('reELO API is up and running on port number ' + port);
});
