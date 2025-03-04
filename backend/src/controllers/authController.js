import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { generateToken } from '../libs/utils.js'

export const Login =async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Email Not correct"})
        }
        const hashPass = await bcrypt.compare(password,user.password)
        if(!hashPass){
            return res.status(400).json({message:"Password not correct"})
        }
        generateToken(user._id,res)
        return res.status(201).json({message:"Login success",data:user})

    } catch (error) {
        console.log("Error in Login controller",error.meesage)
        res.status(500).json({message:"Internal Server Error"})
    }
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

export const LogOut = (req,res)=>{
    try {
        res.cookie('jwt',"",{maxAge: 0})
        res.status(200).json({message:"Logout success"})
    } catch (error) {
        console.log("Error in Logout controller",error.message)
        res.status(400).json({message:"Internal Server Error"})
    }
}