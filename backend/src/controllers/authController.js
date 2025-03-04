import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { generateToken } from '../libs/utils.js'

export const Login =()=>{

}

export const Register=async (req,res)=>{
    const {email,fullName,password,profilePic} = req.body
    try {
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 charactors"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }
        const Salt = await bcrypt.genSalt(10)
        const hashPass = await  bcrypt.hash(password,Salt)

        const newUser = await User.create({
            email,
            fullName,
            password: hashPass
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({meesage:"User created success",data: newUser})
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
        
    } catch (error) {
        console.log('Error in register controller',error.meesage)
        res.status(500).json({message:'Internal server error'})
    }
}

export const LogOut = ()=>{

}