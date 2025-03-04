import mongoose from "mongoose"


export const Connect = async()=>{
    try {
        const connection =await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('Mongoose connected : ' + connection.connection.host)
    } catch (error) {
        console.log('Mongoose error' + error)
    }
}