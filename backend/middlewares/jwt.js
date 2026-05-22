import jwt from 'jsonwebtoken'

const requireAuth=(req,res,next)=>{
 

    const token=req.cookies.token
    
    if(!token) return res.status(401).json({error:"Token not found"})
    try {
      const decoded=  jwt.verify(token, process.env.JWT_SECRET_KEY)
     
      req.user=decoded.userInfo
      next()
    } catch (error) {
        res.status(401).json({message:"Invalid Token"})
    }
    
    
}

const generateToken=(userInfo)=>{
    return jwt.sign({userInfo}, process.env.JWT_SECRET_KEY,{expiresIn:"24h"})
}

export {requireAuth, generateToken}