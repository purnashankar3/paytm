const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware')
const User = require('../db')
const {Account} = require('../db')

router.get('/balance',authMiddleware,async(req,res)=>{
   const account = await Account.findOne({
    userId:req.userId
   })
   res.json({
    balance:account.balance
   })
})

module.exports = router;