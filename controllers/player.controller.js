const Player = require('../models/player.model')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!')
};

exports.player_create = function (req, res) {
  console.log('<<<<<<<<<<<<<< REQUEST >>>>>>>>>>>>>>: ', req)

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
