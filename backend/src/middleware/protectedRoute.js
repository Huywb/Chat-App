import jwt  from 'jsonwebtoken'
import User from '../models/user.js'
export const protectedRoute = async(req,res,next)=>{
    try {
        const Token = req.cookie.jwt
        if(!Token){
            return res.status(401).json({message:"Unauthorized[ - No token "})
        }

        const decode = jwt.verify(Token,process.env.JWT)

        if(!decode){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decode._id)

        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectedRoute",error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}