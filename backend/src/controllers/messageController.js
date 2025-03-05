import User from "../models/user"


export const sendMessage = (req,res)=>{

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