const Player = require('../models/player.model')

// GET
exports.player_details = function (req, res) {
  Player.findById(req.params.id, function (err, player) {
    if (err) return next(err)
    res.send(player)
  })
}

// POST
exports.player_create = function (req, res) {
  const player = new Player(
    {
      name: req.body.name,
      elo: 1500,
    }
  )
  player.save(function(err) {
    if (err) {
      return next(err)
    }
    res.send('A new player joins the fight!')
  })
}

// PATCH
exports.player_update = function (req, res) {
    Player.findByIdAndUpdate(
      req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err)
        res.send('Player udpated.')
    }
  )
}
