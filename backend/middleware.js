const JWT_SECRET = require('./config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.includes("Bearer ")){
        return res.status(411).json({
            message:"Please provide proper token"
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        
            req.userId = decoded.userId;
            console.log(decoded)
            next()
        
    }catch{
        res.status(411).json({

        })
    }
    
}

module.exports = authMiddleware;