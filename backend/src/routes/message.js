import express from 'express'
import { getMessage, getUser, sendMessage } from '../controllers/messageController.js'
import { protectedRoute } from '../middleware/protectedRoute.js'

const router = express.Router()


router.post('/:id',protectedRoute,getMessage)
router.get('/users',protectedRoute,getUser)
router.post('/send/:id',protectedRoute,sendMessage)


export default router