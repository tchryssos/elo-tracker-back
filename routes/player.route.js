const express = require('express')
const router = express.Router()

// Require the controllers WHICH WE DID NOT CREATE YET!!
const player_controller = require('../controllers/player.controller')


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', player_controller.test)
module.exports = router
