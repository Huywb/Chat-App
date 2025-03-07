import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './src/routes/auth.js'
import MessageRoutes from './src/routes/message.js'

import { Connect } from './src/libs/ConnectDB.js'


dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth',authRoutes)
app.use('/api/message',MessageRoutes)




app.listen(5001,(req,res)=>{
    Connect()
    console.log("Server is runing at port 5001")
})