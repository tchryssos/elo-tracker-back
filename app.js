const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PRIVATE = require('./private')

// ROUTES
const player = require('./routes/player.route');

// SETUP DB
const app = express();
let mongoDB = PRIVATE.mongo_uri;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// APP
app.use('/players', player);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 3030;
app.listen(port, () => {
    console.log('reELO API is up and running on port number ' + port);
});
