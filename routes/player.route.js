const express = require('express')
const router = express.Router()

// Controller
const player_controller = require('../controllers/player.controller')

router.get('/test', player_controller.test)
router.post('/create', player_controller.player_create)
module.exports = router
