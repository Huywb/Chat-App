import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { generateToken } from '../libs/utils.js'
import cloudinary from '../libs/cloudinary.js'

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
    
    try {
        const {email,fullName,password,profilePic} = req.body
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
        console.log('Error in register controller',error)
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

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const uploadedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json({message:"Upload profile success",data:uploadedUser})
    } catch (error) {
        console.log("Error in updateProfile controller",error.meesage)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };