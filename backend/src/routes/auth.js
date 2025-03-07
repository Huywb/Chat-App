import express from 'express'
import { checkAuth, Login, LogOut, Register, updateProfile } from '../controllers/authController.js'
import { protectedRoute } from '../middleware/protectedRoute.js'


const router = express.Router()


router.post('/login',Login)
router.post('/register',Register)
router.post('/logout',LogOut)

router.post('/update-profile',protectedRoute,updateProfile)

router.get("/check",protectedRoute,checkAuth)

export default router