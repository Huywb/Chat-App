import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './src/routes/auth.js'
import { Connect } from './src/libs/ConnectDB.js'


dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/auth',authRoutes)




app.listen(5001,(req,res)=>{
    Connect()
    console.log("Server is runing at port 5001")
})