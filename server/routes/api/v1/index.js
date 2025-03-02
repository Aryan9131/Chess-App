const express=require('express');
const router=express.Router();
const GameController = require('../../../Controllers/GameController')
router.get('/new-game',GameController.startGame)
router.post('/player-move',GameController.playerMove)
router.get('/ai-move',GameController.aiMove)

module.exports=router