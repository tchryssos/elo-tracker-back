const Player = require('../models/player.model')
const mongoose = require('mongoose')
const elo = require('../util/elo')

// GET
exports.player_details = function(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if (err) return next(err)
    res.send(player)
  })
}

// POST
exports.player_create = function(req, res) {
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
exports.player_update = function(req, res) {
    Player.findByIdAndUpdate(
      req.params.id, {$set: req.body}, function(err) {
        if (err) return next(err)
        res.send('Player updated.')
    }
  )
}

exports.update_elo = function(req, res) {
  Player.find(
    {
      '_id': {
        $in: [
          mongoose.Types.ObjectId(req.body.winner),
          mongoose.Types.ObjectId(req.body.loser),
        ]
      }
    },
    function(err, players) {
      const winner = players[0]
      const loser = players[1]
      const winnerPercent = elo.expected_score(winner.elo, loser.elo)
      const loserPercent = elo.expected_score(loser.elo, winner.elo)
      const winnerNewElo = elo.newElo(winner.elo, winnerPercent, 1)
      const loserNewElo = elo.newElo(loser.elo, loserPercent, 0)
      winner.elo = winnerNewElo
      loser.elo = loserNewElo
      winner.save()
      loser.save()
      res.send('ELO updated!')
    }
  )
}

// DELETE
exports.player_delete = function (req, res) {
  Player.findByIdAndRemove(
    req.params.id, function(err) {
      if (err) return next(err)
      res.send('Player deleted successfully')
    }
  )
}
