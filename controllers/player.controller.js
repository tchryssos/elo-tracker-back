const Player = require('../models/player.model')
const mongoose = require('mongoose')
const lodash = require('lodash')
const elo = require('../util/elo')

// GET
exports.player_details = function(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if (err) console.log(err)
    res.send(player)
  })
}

exports.players = function(req, res) {
  Player.find({}, function (err, players) {
    if (err) console.log(err)
    const sortedPlayers = lodash.reverse(lodash.sortBy(players, ['elo']))
    const rankedPlayers = sortedPlayers.map((player, i) => (
      {
        name: player.name,
        id: player._id,
        rank: i + 1,
        elo: Math.round(player.elo * 10) / 10, // This returns the elo score to 1 decimal
      }
    ))
    res.send(rankedPlayers)
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
    res.send(`${req.body.name} joins the fight!`)
  })
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
      const winner = players.filter(player => player.id === req.body.winner)[0]
      const loser = players.filter(player => player.id === req.body.loser)[0]
      if (loser && winner) {
        const winnerPercent = elo.expected_score(winner.elo, loser.elo)
        const loserPercent = elo.expected_score(loser.elo, winner.elo)
        const winnerNewElo = elo.newElo(winner.elo, winnerPercent, 1)
        const loserNewElo = elo.newElo(loser.elo, loserPercent, 0)
        winner.elo = winnerNewElo
        loser.elo = loserNewElo
        winner.save()
        loser.save()
        res.send(`ELO updated. ${winner.name}: ${winnerNewElo} ${loser.name}: ${loserNewElo}`)
      } else {
        res.status(400).send({
          error: `Cannot find winner and/or loser. Winner: ${winner} Loser: ${loser}`
        })
      }
    }
  )
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

// DELETE
exports.player_delete = function (req, res) {
  Player.findByIdAndRemove(
    req.params.id, function(err) {
      if (err) return next(err)
      res.send('Player deleted successfully')
    }
  )
}
