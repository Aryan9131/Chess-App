const express=require('express');
const router=express.Router();
const GameController = require('../../../Controllers/GameController')
router.get('/new-game',GameController.startGame)
router.post('/player-move',GameController.playerMove)
router.get('/ai-move',GameController.aiMove)
router.get('/test',(req, res)=>{
    return res.status(200).json({
        message:'got the api !'
    })
})

module.exports=router