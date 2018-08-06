const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PlayerSchema = new Schema({
  name: {type: String, required: true, max: 100},
  elo: {type: Number, required: true},
})

module.exports = mongoose.model('Player', PlayerSchema)
