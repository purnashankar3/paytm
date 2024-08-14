const express = require("express");
const zod = require('zod')
const {User} = require('../db')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')

const {Account} = require('../db')
const authMiddleware = require('../middleware')
router.use(express.json())

const signupBody = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

router.post('/signup',async (req,res)=>{
   
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Invalid inputs"
        })
    }
    const userExists = await User.findOne({
        username:req.body.username
    })

    if(userExists){
       return res.status(411).json({
            message:"User already exists with these credentials"
    })
    }

    const user_Db = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })
    const userid = user_Db._id;
    await Account.create({
        userId:userid,
        balance:1+Math.random()*1000
    })
    const token = jwt.sign({userid},JWT_SECRET)
    return res.status(200).json({
       message: "User created successfully",
        token
    })
})

const signInBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})
router.post('/signin',authMiddleware, async (req,res)=>{
    const {success} = signInBody.safeParse(req.body)
    const username = req.body.username;
    const password = req.body.password;
    if(!success){
        return res.status(411).json({
            message:"Credentials are wrong"
        })
    }

    const userExists = await User.findOne({
        username,
        password
    })
    
    if(userExists ){
        const token = jwt.sign({userId:userExists._id},JWT_SECRET)
       return res.status(200).json({
            token
        })
    }

})

router.put("/",authMiddleware, async (req,res)=>{
   const updatedUser = await User.updateOne(req.body,{
    id :req.userId
   })
   if(updatedUser){
        res.status(200).json({
            message:"Updated successfully"
        })
    }
    
})

router.get('/bulk',async (req,res)=>{

    const filter = req.query.filter || ""
    const users = User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

   // res.send(JSON.stringify(users))

    res.json({
        user:Array.from(users).map((user)=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router