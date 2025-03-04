import express from 'express'
import { Login, LogOut, Register } from '../controllers/authController.js'


const router = express.Router()


router.post('/login',Login)
router.post('/register',Register)
router.post('/logout',LogOut)

export default router