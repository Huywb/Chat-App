import express from 'express'
import { sendMessage } from '../controllers/messageController.js'
import { protectedRoute } from '../middleware/protectedRoute.js'

const router = express.Router()


router.post('/send',protectedRoute,sendMessage)
router.get('/get-user',protectedRoute,getUser)


export default router