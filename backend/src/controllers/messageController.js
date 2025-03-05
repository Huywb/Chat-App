import cloudinary from "../libs/cloudinary.js"
import Message from "../models/message.js"
import User from "../models/user.js"


export const getMessage = async(req,res)=>{
    try {
        const myId = req.user._id
        const {id} = req.params
        const messages = await Message.find({
            $or: [
                {senderId:myId,receiveId:id},
                {senderId:id, receiveId:myId}
            ]
        })
        res.status(200).json({message:"Get message success",data:messages})
    } catch (error) {
        console.log("Error in getMessage controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getUser = async(req,res)=>{
    try {
        const userId = req.user._id
        const GetallUser = await User.find()
        const FilterUser = GetallUser.map((user)=> user._id !== userId)

        res.status(200).json({message:"Get user success",data: FilterUser})
    } catch (error) {
        console.log("Error in getUser controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const {id} = req.params
        const myId = req.user._id
        const {text,image} = req.body

        let imgUrl 

        if(image){
            const uploadImage = await cloudinary.uploader.upload(image)
            imgUrl = uploadImage.secure_url
        }

        const MessSend = await Message.create({
            senderId: myId,
            receiveId: id,
            text,
            image : imgUrl
        })

        await MessSend.save()

        res.status(200).json({message:"Send Message success",data:MessSend})
    } catch (error) {
        console.log("Error in sendMessage controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}